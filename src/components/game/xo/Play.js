import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatBox from "../../chat/ChatBox";
import BoardXO from "./BoardXO";
import Player from "./Player";
import Contrast from "../../../Contrast";
import nhac from "../../../assets/mp3/lmht.mp3";


const getPlayer = (data, user_id) => {
  if(data.player1.id === user_id )return data.player1;
  return data.player2;
};

const getOpponent = (data, user_id) => {
  if(data.player1.id !== user_id )return data.player1;
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

  const player = (data, user_id) => {
    setYou(getPlayer(data, user_id));
    setOpponent(getOpponent(data, user_id));
  };

  const handleMessage = (res) => {
    const mess = JSON.parse(localStorage.getItem("messages")) || [];
    if (res != "")
      mess.push(res);
    localStorage.setItem("messages", JSON.stringify(mess));
    return mess;
  };

  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe(
        `/topic/xo/${Contrast.ID_GAMEXO}/${data.match_id}`,
        function (response) {
          const res = JSON.parse(response.body);

          switch (res.status) {
            case Contrast.START_GAME:
              setStatus(res.status);
              setBoard(res.board);
              setTurn(res.turn);
              player(res, data.user_id);
              break;

            case Contrast.PLAY:
              setBoard(res.board);
              setStatus(res.status);
              setTurn(res.turn);
              player(res, data.user_id);
              break;

            case Contrast.MESSAGE:
              setMessages(handleMessage(res));
              break;

            case Contrast.CANCEL_GAME:
              setStatus(res.status);
              player(res, data.user_id);
              break;

            case Contrast.PLAY_AGAIN:
              setStatus(res.status);
              player(res, data.user_id);
              break;

            case Contrast.READY:
              setStatus(res.status);
              player(res, data.user_id);
              break;

            case Contrast.END_GAME:
              setBoard(res.board);
              setStatus(res.status);
              player(res, data.user_id);
          }

          console.log(res);
        }
      );

      setStatus(data.status);
      setBoard(data.board);
      setMessages(handleMessage(""));
      player(data, data.user_id);
      setstompClient(stompClient);
    });
    return () => {
      stompClient.disconnect();
      localStorage.removeItem("messages");
      console.log("Unmouted");
    };
  }, []);


  return (
    <div className="container-fluid padding-0">
      <div className="row">
        {you && opponent ? (
          <>
            <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
              <div>
                <Player
                  player={you}
                  match_id={data.match_id}
                  stompClient={stompClient}
                  you={1}
                  turn={turn}
                />
                <BoardXO
                  data={{
                    stompClient: stompClient,
                    type: you.type,
                    match_id: data.match_id,
                    board: board,
                    status: status,
                  }}
                />
                <Player
                  player={opponent}
                  match_id={data.match_id}
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
                  user_id: data.user_id,
                  match_id: data.match_id,
                  url:`/app/xo/${1}/${data.match_id}`,
                  messages: messages 
                }}
              />
            </div>
          </>
        ) : ""}
      </div>
    </div>
  );
};

export default Play;
