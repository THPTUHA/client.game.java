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
import ChatGeneral from "./ChatGeneral";
function Game() {
  const { user ,updateDataUser } = useContext(UserContext);
  const [stompClient, setstompClient] = useState();
  const [messages, setMessages] = useState([]);


  return (
    <>
          <NavBar />
          <div className="container-fluid game">
            <div className="row">
              <div className="col-sm-6">
                <h1>Game </h1>
                <Link to={`gameplay/xo`}>Cờ Caro</Link>
                <div>
                 <Link to={`gameplay/cw`}>Nối từ</Link>
                </div>
              </div>
              <div className="col-lg-6">
                <ChatGeneral user_id={user.id}/>
              </div>
            </div>
          </div>
    </>
  );
}

export default Game;
