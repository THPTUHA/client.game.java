import { Route, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import GameXO from "./xo/GameXO";
import { UserContext } from "../../context/UserProvider";
import { useContext, useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import { Switch } from "react-router";
import ChatBox from "../chat/ChatBox";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import caroGame from "../../assets/img/caroGame.png";
import axios from "axios";
import { authorization } from "../../service/authorization";
function Game() {
  const { user ,updateDataUser } = useContext(UserContext);
  const [stompClient, setstompClient] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(async()=>{
    updateDataUser({...user,status:-1});
    try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/gameplay/chat`,authorization());
      console.log(res);
      setMessages(res.data);
    }catch(err){

    }
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(
        `/topic/chat`,
        function (response) {
          const res = JSON.parse(response.body);
          setMessages(res);
        }
      )});
    setstompClient(stompClient);

    return ()=>{
      stompClient.disconnect();
    }
  },[]);

  return (
    <>
          <NavBar />
          <div className="container-fluid game">
            <div className="row">
              <div className="col-sm-6">
                <h1>Game </h1>
                <Link to={`gameplay/xo`}>Cờ Caro</Link>
              </div>
              <div className="col-lg-6">
                <ChatBox
                  data={{
                    stompClient: stompClient,
                    user_id: user.id,
                    match_id: 0,
                    url:`/app/chat`,
                    messages: messages 
                  }}
                />
              </div>
            </div>
          </div>
    </>
  );
}

export default Game;
