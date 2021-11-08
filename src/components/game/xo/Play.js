import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import BoardXO from "./BoardXO";

const id_game = 1;

const Play=({data})=>{
    const [player,setPlayer]=useState();
    const [winner,setWinner]=useState();
    const [board,setBoard] =useState([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
    const [stompClient,setstompClient] =useState();

    useEffect(()=>{
        const socket = new SockJS("http://localhost:8080/gameplay");
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
        console.log("Connected: " + frame);
        stompClient.subscribe( `/topic/xo/${id_game}/${data.id_match}`,
            function (response) {
            let res = JSON.parse(response.body);
            if(res.player1&&res.player2){
                setPlayer([res.player1,res.player2]);
            }
            if(res.board){
                setBoard(res.board);
            }
            if(res.winner){
                console.log("SET Winner.................//////");
                setWinner(res.winner);
            }
            console.log(res);
            }
        );
        if(data.status){
            const req={id_match:data.id_match,status:1};
            stompClient.send(`/app/xo/${id_game}/${data.id_match}`,{}, JSON.stringify(req));
        }
        setstompClient(stompClient);
    });
    },[]);

    function userWinner(winner) {
        console.log("/////",winner);
        switch(winner){
            case 1:
                return player[0].name;
            case 2:
                return player[1].name;
            default:
                return "Hoà";
        }
    }
    return (
        <div>
            {
                (player)?(
                    <>
                        <h1>You:{player[data.type-1].name} EXP:{player[data.type-1].exp}</h1>
                        <h1>Friend:{player[2-data.type].name} EXP:{player[2-data.type].exp}</h1>
                        <BoardXO data={
                            {
                                stompClient:stompClient,
                                type:data.type,
                                id_match:data.id_match,
                                board:board,
                                winner:winner
                            }
                        }/>
                       {
                         (winner)?(
                            <h1>Winner:{()=>{userWinner(winner)}}</h1>
                         ):(
                             <></>
                         )
                       }
                    </>
                ):(
                    <h1>Wating....</h1>
                )
            }
        </div>
        
    )
}

export default Play;