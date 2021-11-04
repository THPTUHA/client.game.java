import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient;
let id_game=1;
let ans;

  
function GameXO({user}){
    const[x,setX]=useState();
    const[y,setY]=useState();
    const[map,setMap]=useState();
    const[winner,setWinner]=useState();
    function creactMap(board){
        const temp=board.map((row,index)=>{
            return (
                <div key={index}>
                {
                    row.map((ele,index1)=>{
                     return (
                        ele==1?(<span key={index1}>X</span>):
                      ele==2?(<span key={index1}>O</span>):
                      (<span key={index1}>...</span>)
                     )
                    })
                }
             </div>
            )
        });
         setMap(temp);
     }
     
     function userWinner(winner){
         setWinner((winner==1?(<h1>User 1 Win</h1>):winner==2?(<h1>User 2 Win</h1>):(<h1>Đang hòa</h1>)))
     }
     function connect(id_match) {
         var socket = new SockJS('http://localhost:8080/gameplay');
         stompClient = Stomp.over(socket);
         stompClient.connect({}, function (frame) {
             console.log('Connected: ' + frame);
             stompClient.subscribe(`/topic/xo/${id_game}/${id_match}`, function (response) {
                 let data=JSON.parse(response.body);
                 console.log(JSON.parse(response.body));
                 creactMap(data.board);
                 userWinner(data.winner)
             });
         });
     }
     
     function disconnect() {
         if (stompClient !== null) {
             stompClient.disconnect();
         }
     
         console.log("Disconnected");
     }
     
       function sendAction(x,y,type,id_match) {
         console.log("send to:",id_match);
         const play={coordinateX:x,coordinateY:y,type:type,id_match:id_match}
        if(stompClient) stompClient.send(`/app/xo/${id_game}/${id_match}`, {}, JSON.stringify(play));
       }

    const submitForm = async ()=>{
      try{
        ans = await axios.post("http://localhost:8080/xo/start",{id_user:user.id});
        connect(ans.data.id_match);
        console.log(ans.data);
      }catch(err){
        console.log(err);
      }
    }
    return(
      <div>
        <input type="text" onChange={(e)=>{setX(e.target.value)}}/>
        <input type="text" onChange={(e)=>{setY(e.target.value)}}/>
        <button onClick={submitForm}>Start</button>
        <button onClick={(e)=>{sendAction(x,y,ans.data.type,ans.data.id_match)}}>Send</button>
        <button onClick={disconnect}>End</button>
        {map}
        {winner}
      </div>
    )
  }

export default GameXO;