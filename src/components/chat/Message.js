import React, { memo } from "react";

 function Message({message,is_chat}) {
  return (
    <div className="d-flex  align-items-center mb-2 " >
     {
       !is_chat?(
        <>
          <img
            // className="accountAvatar"
            src={`https://avatars.dicebear.com/api/micah/${message.name}.svg`}
            alt=""
          />
          <h5>
            {message.message}
          </h5>
        </>
       ):(
            <h5 className="float-right">
            {message.message}
            </h5>
       )
     }
    </div>
  );
}

export default memo(Message);
