import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatBox from "../../chat/ChatBox";
import BoardXO from "./BoardXO";

const id_game = 1;

const Play = ({ data }) => {
  const [player, setPlayer] = useState();
  const [winner, setWinner] = useState();
  const [status, setStatus] = useState();
  const [messages, setMessages] = useState([]);
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [stompClient, setstompClient] = useState();

  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe(
        `/topic/xo/${id_game}/${data.id_match}`,
        function (response) {
          let res = JSON.parse(response.body);
          if (res.player1 && res.player2) {
            setPlayer([res.player1, res.player2]);
          }
          if (res.board) {
            setBoard(res.board);
          }
          if (res.winner) {
            console.log("SET Winner.................//////");
            setWinner(res.winner);
          }
          if (res.status) {
            setStatus(res);
          }
          if (res.message) {
            const mess = JSON.parse(localStorage.getItem("messages")) || [];
            mess.push({
              message: res.message,
              name: res.player1.name,
              type: res.player1.type,
            });
            console.log(mess);
            localStorage.setItem("messages", JSON.stringify(mess));
            setMessages(mess);
          }
        }
      );
      if (data.status) {
        const req = { id_match: data.id_match, status: 1 };
        stompClient.send(
          `/app/xo/${id_game}/${data.id_match}`,
          {},
          JSON.stringify(req)
        );
      }
      console.log("connect...///");
      setstompClient(stompClient);
    });
    return () => {
      console.log("Unmouted");
    };
  }, []);

  useEffect(() => {
    if (
      status &&
      status.status == 2 &&
      status.player1.id == player[data.type - 1].id
    ) {
      localStorage.removeItem("messages");
      stompClient.disconnect();
    }
  }, [status]);

  const handleCannerMatch = () => {
    try {
      const req = { id_match: data.id_match, status: 2, type: data.type };
      stompClient.send(
        `/app/xo/${id_game}/${data.id_match}`,
        {},
        JSON.stringify(req)
      );
    } catch (err) {
      console.log(err);
    }
  };

  function userWinner(winner) {
    switch (winner) {
      case 1:
        return player[0].name;
      case 2:
        return player[1].name;
      default:
        return "Hoà";
    }
  }

  function playAgain() {
    try {
      const req = { id_match: data.id_match, status: 3, type: data.type };
      stompClient.send(
        `/app/xo/${id_game}/${data.id_match}`,
        {},
        JSON.stringify(req)
      );
      setWinner(0);
    } catch (err) {
      console.log(err);
    }
  }

  const handleStatus = (status, player) => {
    if (status) {
      if (status.status == 2) {
        if (status.player1.id == player[data.type - 1].id)
          return <Redirect to="/gameplay" />;
        return <h5 className="text-danger">{" đã rời trận"}</h5>;
      }

      if (status.status == 3) {
        return <h1>{status.player1.name + " đã sắn sàng"}</h1>;
      }
    }
  };
  return (
    <div className="container-fluid padding-0">
      <div className="row">
        {player ? (
          <>
            <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
              <div>
                <div className="d-flex align-items-center mb-1">
                  <img
                    // className="accountAvatar"
                    style={{ width: 40 }}
                    src={`https://avatars.dicebear.com/api/micah/${
                      player[data.type - 1].name
                    }.svg`}
                    alt=""
                  />
                  <h5>
                    {player[data.type - 1].name} EXP:{" "}
                    {player[data.type - 1].exp}
                  </h5>
                  <button
                    style={{ marginLeft: "1rem" }}
                    className="btn btn-danger"
                    onClick={handleCannerMatch}
                  >
                    Thoát trận
                  </button>
                </div>

                <BoardXO
                  data={{
                    stompClient: stompClient,
                    type: data.type,
                    id_match: data.id_match,
                    board: board,
                    winner: winner,
                  }}
                />

                <div className="d-flex align-items-center">
                  <img
                    style={{ width: 50 }}
                    src={`https://avatars.dicebear.com/api/micah/${
                      player[2 - data.type].name
                    }.svg`}
                    alt=""
                  />
                  <h5>
                    {player[2 - data.type].name} EXP:{" "}
                    {player[2 - data.type].exp}
                  </h5>
                  {handleStatus(status, player)}
                </div>
                {winner ? (
                  <div>
                    <button className="btn btn-success" onClick={playAgain}>
                      Chơi lại
                    </button>
                    <h5 className="d-inline-block p-2">
                      {userWinner(winner)} chiến thắng
                    </h5>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <ChatBox
                data={{
                  stompClient: stompClient,
                  type: data.type,
                  id_match: data.id_match,
                  winner: winner,
                  messages: messages,
                }}
              />
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <h3>Đang tìm trận</h3>
            <i className="fad fa-spinner-third"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;
