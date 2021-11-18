import { useEffect, useState } from "react"
import Contrast from "../../Contrast" 

let pre;
const id_game =1;

const CountDown= ({data})=>{
    const [time,setTime]=useState(data.time);

    useEffect(()=>{
    if(time===0&& data.is_send){
        const play = {
            random:true,
            type: data.type,
            id_match: data.id_match,
            status:Contrast.PLAY
          };
        data.stompClient.send( `/app/xo/${id_game}/${data.id_match}`, {}, JSON.stringify(play) );
    }
     pre= setTimeout(()=>{
            setTime(time-1);
    },1000);

        return ()=>{
            clearTimeout(pre);
        }
    },[time]);
    return (
        <div>{time}</div>
    )
}

export default CountDown;