import React, { memo } from "react";
import chatSound from "../../assets/mp3/discord.mp3";
function Message({ message, is_chat ,you,opponent}) {
  // console.log(message);
  return (
    <div className="">
      {!is_chat ? (
        <div className="d-flex  justify-content-start align-items-end mb-2 ">
          <img
            src={opponent.avatar?opponent.avatar:`https://avatars.dicebear.com/api/micah/${opponent.name}.svg`}
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
            src={you.avatar?you.avatar:`https://avatars.dicebear.com/api/micah/${you.name}.svg`}
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default memo(Message);
