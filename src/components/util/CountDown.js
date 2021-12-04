import { useEffect, useState } from "react"
import Contrast from "../../Contrast" 

let pre;
const CountDown= ({data})=>{
    const [time,setTime]=useState(data.time);
    useEffect(()=>{
    
    const play ={status:11,time:time,match_id:data.match_id};
    // data.stompClient.send( `/app/xo/${Contrast.ID_GAMEXO}/${data.match_id}`, {}, JSON.stringify(play) );
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