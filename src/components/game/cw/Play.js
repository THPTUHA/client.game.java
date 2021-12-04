import React, { memo, useState, useEffect, useRef } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Message from "./Message";
import Contrast from "../../../Contrast";
import chatSound from "../../../assets/mp3/discord.mp3";
import { authorization } from "../../../service/authorization";
import Loading from "../../../loading/Loading";
import Player from "./Player";


const id_game = 2;
const getOpp = (opp,type)=>{
    for(let c in opp){
      if(opp[c].type===type)return opp[c];
    }
}
function Play({data}) {
  const [you,setYou] = useState();
  const [opponent,setOpponent] = useState();
  const [status, setStatus] = useState();
  const [turn ,setTurn] = useState();
  const [time ,setTime] = useState();
  const [answers ,setAnswers] = useState();
  const [word ,setWord] = useState();

  const [audio] = useState(new Audio(chatSound));
  const [playing, setPlaying] = useState(false);
  const [stompClient, setstompClient] = useState();
  const [message, setMessage] = useState("");
  const [loading ,setLoading] = useState(false);
  const [newMes, setNewMes] = useState(false);

  const handleAnswer = (res,status) => {
    if (res )
     {
       if(status===Contrast.PLAY_AGAIN){
          localStorage.removeItem("answers");
          return [];
       }else{
        const mess = JSON.parse(localStorage.getItem("answers")) || [];
        mess.push(res);
        localStorage.setItem("answers", JSON.stringify(mess));
        return mess;
       }
     }
  };

  const player = (data, user_id)=>{
    let tmp = [];
    for(var i in data){
      if(data[i].user_id === user_id)setYou(data[i]);
      else tmp.push(data[i]);
    }
    setOpponent(tmp);
  }

  const handleMessage = (e) => {
    if (message === "") return;
    if (e.key === "Enter" || e.type === "click") {
      setPlaying(false);
      stompClient.send(
        `/app/cw/2/${data.match_id}`,
        {},
        JSON.stringify({
          type:you.type,
          message: message,
          match_id: data.match_id,
          status: Contrast.PLAY,
        })
      );
      setMessage("");
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
    // if (playing) audio.play();
    // setPlaying(true);
  }, [answers]);

  useEffect(() => {
   if(you&&you.status === Contrast.CANCEL_GAME )
   stompClient.disconnect();
  }, [you]);

  useEffect(async()=>{
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(
        `/topic/cw/2/${data.match_id}`,
        function (response) {
          const res = JSON.parse(response.body);
          switch (res.status) {
            case Contrast.START_GAME:
              setStatus(res.status);
              setTurn(res.turn);
              player(res.player, data.user_id);
              break;

            case Contrast.TIME_SET:
              setTime(res.time);
              break;
            
            case Contrast.PLAY:
              setAnswers(handleAnswer(res.answer,res.status));
              setStatus(res.status);
              setTurn(res.turn);
              // setTime(res.time);
              if(res.word!="\u0000")
              setWord(res.word);
              player(res.player, data.user_id);
              break;

            case Contrast.CANCEL_GAME:
              setStatus(res.status);
              player(res.player, data.user_id);
              break;

            case Contrast.PLAY_AGAIN:
              setAnswers(handleAnswer(res.answer,res.status));
              setStatus(res.status);
              setTurn(res.turn);
              player(res.player, data.user_id);
              break;

            case Contrast.READY:
              setStatus(res.status);
              player(res.player, data.user_id);
              break;

            case Contrast.END_GAME:
              console.log(res);
              setAnswers(handleAnswer(res.answer,res.status));
              setStatus(res.status);
              player(res.player, data.user_id);
          }
        }
      )});

   
    player(data.player,data.user_id);
    setstompClient(stompClient);
    return ()=>{
      console.log("UNMOUT")
      stompClient.disconnect();
    }
  },[]);

  return (
    <div>
     {
       you&&opponent?(
          <>
          <Player 
          player={you}
          match_id={data.match_id}
          stompClient={stompClient}
          you={1}
          turn = {turn}
          time  = {data.time}
          url ={`/app/cw/2/${data.match_id}`}
        />
          {
            opponent.map((e,index)=>{
              return <Player 
                        key = {index}
                        player={e}
                        match_id={data.match_id}
                        stompClient={stompClient}
                        you={0}
                        turn = {turn}
                        time  = {data.time}
                        url ={`/app/cw/2/${data.match_id}`}
                      />
            })
          }
          </>
       )
       :""
     }
      <div className="chatBox mt-lg-4 ">
      <h3>{word?word:"Trò chuyện"}</h3>
      <div  className="content mt-1 mb-2 ">
        {
          answers?answers.map((e, index) => {
            if(you.type === e.type){
              return (
                      <Message
                        key={index}
                        message={e}
                        is_chat={you.type === e.type}
                        you = {you}
                      />
                    );
            }
            return (
                      <Message
                        key={index}
                        message={e}
                        is_chat={you.type === e.type}
                        you = {getOpp(opponent,e.type)}
                      />
                    );
         }):""
        }
        <div ref={messagesEndRef} />
      </div>
      {
        you&&you.type === turn ?(
          <div className="d-flex" onKeyPress={handleMessage}>
          <input
            placeholder="Aa"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <i className="fas fa-arrow-circle-right " onClick={handleMessage}></i>
        </div>
        ):""
      }
      </div>
    </div>
  );
}

export default memo(Play);
