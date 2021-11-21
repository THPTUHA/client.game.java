import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatBox from "../../chat/ChatBox";
import BoardXO from "./BoardXO";
import Player from "./Player";
import Contrast from "../../../Contrast";
import CountDown from "../../util/CountDown";
import nhac from "../../../assets/mp3/lmht.mp3";
import nhacGame from "../../../assets/mp3/startedGame.mp3";

const getPlayer = (data, type) => {
  if (type === 1) return data.player1;
  return data.player2;
};
const Play = ({ data }) => {
  const [you, setYou] = useState();
  const [opponent, setOpponent] = useState();
  const [status, setStatus] = useState();
  const [turn, setTurn] = useState();
  const [messages, setMessages] = useState([]);
  const [board, setBoard] = useState([]);
  const [stompClient, setstompClient] = useState();

  const player = (data, type) => {
    setYou(getPlayer(data, type));
    setOpponent(getPlayer(data, 3 - type));
  };

  const handleMessage = (res) => {
    const mess = JSON.parse(localStorage.getItem("messages")) || [];
    if (res != "")
      mess.push({
        message: res.message,
        type: res.player.type,
      });
    localStorage.setItem("messages", JSON.stringify(mess));
    return mess;
  };
  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe(
        `/topic/xo/${Contrast.ID_GAMEXO}/${data.id_match}`,
        function (response) {
          const res = JSON.parse(response.body);

          switch (res.status) {
            case Contrast.START_GAME:
              setStatus(res.status);
              setBoard(res.board);
              setTurn(res.turn);
              player(res, data.type);
              break;

            case Contrast.PLAY:
              setBoard(res.board);
              setStatus(res.status);
              setTurn(res.turn);
              player(res, data.type);
              break;

            case Contrast.MESSAGE:
              setMessages(handleMessage(res));
              break;

            case Contrast.CANCEL_GAME:
              setStatus(res.status);
              player(res, data.type);
              break;

            case Contrast.PLAY_AGAIN:
              setStatus(res.status);
              player(res, data.type);
              break;

            case Contrast.READY:
              setStatus(res.status);
              player(res, data.type);
              break;

            case Contrast.END_GAME:
              setBoard(res.board);
              setStatus(res.status);
              player(res, data.type);
          }

          console.log(res);
        }
      );

      if (data.status === Contrast.RELOAD) {
        console.log(data);
        setStatus(data.status);
        setBoard(data.board);
        setMessages(handleMessage(""));
        player(data, data.type);
      }

      if (data.status === Contrast.START_GAME) {
        const req = { id_match: data.id_match, status: Contrast.START_GAME };
        stompClient.send(
          `/app/xo/${Contrast.ID_GAMEXO}/${data.id_match}`,
          {},
          JSON.stringify(req)
        );
      }

      setstompClient(stompClient);
    });
    return () => {
      stompClient.disconnect();
      console.log("Unmouted");
    };
  }, []);

  useEffect(() => {
    if (status && you) {
      if (you.status === Contrast.CANCEL_GAME) {
        localStorage.removeItem("messages");
        stompClient.disconnect();
      }
    }
  }, [status]);

  return (
    <div className="container-fluid padding-0">
      <div className="row">
        {you && opponent ? (
          <>
            <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
              <div>
                <Player
                  player={you}
                  id_match={data.id_match}
                  stompClient={stompClient}
                  you={1}
                  turn={turn}
                />
                <BoardXO
                  data={{
                    stompClient: stompClient,
                    type: data.type,
                    id_match: data.id_match,
                    board: board,
                    status: status,
                  }}
                />
                <Player
                  player={opponent}
                  id_match={data.id_match}
                  stompClient={stompClient}
                  you={0}
                  turn={turn}
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <ChatBox
                data={{
                  stompClient: stompClient,
                  type: data.type,
                  id_match: data.id_match,
                  messages: messages,
                  avatar:{you :{name:you.name,avatar:you.avatar},
                          opponent :{name:opponent.name,avatar:opponent.avatar}}
                }}
              />
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <audio playsInline loop autoPlay>
              <source src={nhac} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <h3>Đang tìm trận</h3>
            <i className="fad fa-spinner-third"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;
