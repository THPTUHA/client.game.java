import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatBox from "../../chat/ChatBox";
import BoardXO from "./BoardXO";
import Contrast from "../../../Contrast";
import CountDown from "../../util/CountDown";
import nhac from "../../../assets/mp3/lmht.mp3";
import nhacGame from "../../../assets/mp3/startedGame.mp3"

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
          const res = JSON.parse(response.body);

          switch (res.status){
            case Contrast.START_GAME:
              setStatus(res);
              setBoard(res.board);
              setPlayer([res.player1, res.player2]);
              break;

            case Contrast.PLAY:
              if(res.board) setBoard(res.board);
              setStatus(res);
              break;

            case Contrast.MESSAGE:
              const mess = JSON.parse(localStorage.getItem("messages")) || [];
              mess.push({
                message: res.message,
                name: res.player1.name,
                type: res.player1.type,
              });
              localStorage.setItem("messages", JSON.stringify(mess));
              setMessages(mess);
              break;

            case Contrast.CANCEL_GAME:
              setStatus(res);
              break;

            case Contrast.PLAY_AGAIN:
              setStatus(res);
              break;
            
            case Contrast.READY:
              console.log(data);
              setStatus(res);
              break;

            case Contrast.END_GAME:
              setBoard(res.board);
              setWinner(res.winner);
              setPlayer([res.player1, res.player2]);
              setStatus(res);
          }
          
          console.log(res);
        }
      );

      if(data.loading){
          console.log(data);
          setStatus(data);
          setBoard(data.board);
          setPlayer([data.player1, data.player2]);
      }else
      if (data.status== Contrast.START_GAME) {
        const req = { id_match: data.id_match, status: Contrast.START_GAME };
        stompClient.send(
          `/app/xo/${id_game}/${data.id_match}`,
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
    if (status) {
      if( status.status==Contrast.CANCEL_GAME && status.player1.id == player[data.type - 1].id)
      {
        localStorage.removeItem("messages");
        stompClient.disconnect();
      }
    }
  }, [status]);

  const handleCancelMatch = () => {
    try {
      const req = { id_match: data.id_match, status: Contrast.CANCEL_GAME, type: data.type };
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

  function playAgain(){
    try{
      const req = { id_match: data.id_match, status: Contrast.PLAY_AGAIN, type: data.type };
      stompClient.send( `/app/xo/${id_game}/${data.id_match}`, {}, JSON.stringify(req) );
      setWinner(0);
    } catch (err) {
      console.log(err);
    }
  }


  const handleStatus=(status,player)=>{
    if(status){
      if(status.status== Contrast.CANCEL_GAME){
        if(status.player1.id == player[data.type - 1].id)
          return <Redirect to="/gameplay" />;
        return <h5 className="text-danger">{" đã rời trận"}</h5>;
      }

      if(status.status== Contrast.PLAY_AGAIN){
        if(status.player1.id != player[data.type - 1].id)
        return <h1>{status.player1.name + " đã sẵn sàng"}</h1>;
      }

      
    }
  };

  const ready = ()=>{
    try{
      const req = { id_match: data.id_match, status: Contrast.READY, type: data.type };
      stompClient.send( `/app/xo/${id_game}/${data.id_match}`, {}, JSON.stringify(req) );
    } catch (err) {
      console.log(err);
    }
  }
 
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
                  {
                    status.status===Contrast.PLAY && player[data.type - 1].type === status.type?(
                      <CountDown data={
                       { 
                        time :2,
                        type:data.type,
                        stompClient:stompClient,
                        id_match: data.id_match,
                        is_send : true
                       }
                      }/>
                    ):""
                  }
                  {
                    (status.status===Contrast.START_GAME ||
                    (status.status===Contrast.READY&& player[data.type - 1].type !== status.player1.type ))
                    ?(<button onClick={ready}>Sẵn sàng</button>):""
                  }
                  <button
                    style={{ marginLeft: "1rem" }}
                    className="btn btn-danger"
                    onClick={handleCancelMatch}
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
                    status: status.status
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
                  {
                    status.status===Contrast.PLAY && player[2 - data.type ].type === status.type?(
                      <CountDown data={
                       { 
                        time :2,
                        type:data.type,
                        stompClient:stompClient,
                        id_match:data.id_match,
                        is_send : false
                       }
                      }/>
                    ):""
                  }
                  {
                    status.status===Contrast.READY && status.player1.id != player[data.type - 1].id?(
                      <h1>{status.player1.name + " đã sẵn sàng"}</h1>
                    ):""
                  }
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
