import React, { memo } from "react";
import chatSound from "../../assets/mp3/discord.mp3";
function Message({ message, is_chat }) {
  // console.log(message);
  return (
    <div className="">
      {!is_chat ? (
        <div className="d-flex  justify-content-start align-items-end mb-2 ">
          <img
            src={`https://avatars.dicebear.com/api/micah/${message.name}.svg`}
            alt=""
          />
          <p className="message--received">{message.message}</p>
          <audio playsInline autoPlay>
            <source src={chatSound} type="audio/mpeg" />
          </audio>
        </div>
      ) : (
        <div className="d-flex  justify-content-end align-items-end mb-2">
          <p className="message--sent">{message.message}</p>
          <img
            src={`https://avatars.dicebear.com/api/micah/${message.name}.svg`}
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default memo(Message);
