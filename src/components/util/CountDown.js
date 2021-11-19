import { useEffect, useState } from "react"
import Contrast from "../../Contrast" 

let pre;
const CountDown= ({data})=>{
    const [time,setTime]=useState(data.time);

    useEffect(()=>{
    if(time===0){
        const play = {
            random:true,
            type: data.type,
            id_match: data.id_match,
            status:Contrast.PLAY
          };
        data.stompClient.send( `/app/xo/${Contrast.ID_GAMEXO}/${data.id_match}`, {}, JSON.stringify(play) );
    }
     pre= setTimeout(()=>{
            setTime(time-1);
    },1000);
        return ()=>{
            console.log(pre);
            clearTimeout(pre);
        }
    },[time]);
    return (
        <div>{time}</div>
    )
}

export default CountDown;