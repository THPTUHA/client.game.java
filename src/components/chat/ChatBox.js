import React, { useState } from "react";
import Message from "./Message";

const id_game = 1;
export default function ChatBox({data}) {
  const [mes,setMes] = useState();
  console.log(data);
  const handleMessage=()=>{
    console.log(mes);
    data.stompClient.send( `/app/xo/${id_game}/${data.id_match}`, {}, 
    JSON.stringify({id_match:data.id_match,   type:data.type,    message:mes}) );
  }

  return (
    <div className="chatBox mt-lg-4">
      <h3>Chat Box</h3>
      <div className="content mt-1 mb-2">
        {
            data.messages.map((e,index)=>
             <Message key={index} message={e}/>
          )
        }
      </div>
      <div className="d-flex">
        <input placeholder="Aa" type="text" onChange={(e)=>(setMes(e.target.value))} />
        <i className="far fa-arrow-circle-right " onClick={handleMessage}></i>
      </div>
    </div>
  );
}
