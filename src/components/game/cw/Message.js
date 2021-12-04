import React, { memo } from "react";
import Contrast from "../../../Contrast";

function Message({ message, is_chat ,you}) {
  // console.log(message);
  return (
    <div className="">
      {!is_chat ? (
        <div className="d-flex  justify-content-start align-items-end mb-2 ">
          {/* <img
            src={
              message.avatar
                ? message.avatar
                : `https://avatars.dicebear.com/api/micah/${message.name}.svg`
            }
            alt=""
          /> */}
          <div
            style={{
              backgroundImage: `url(${
                you.avatar
              }`,
            }}
            className="accountAvtContainer"
          ></div>
          <div className="d-flex flex-column">
            <p style={{ fontSize: "0.5rem", marginLeft: "0.5rem" }}>
              {message.user_name}
            </p>
            <p className={message.status === Contrast.UNCHECK?
                "answer--received-check":
                message.status === Contrast.WRONG?
                "answer--received-wrong":
                message.status === Contrast.CORRECT?
                "answer--received-correct":""
          }>{message.word}</p>
          </div>
        </div>
      ) : (
        <div className="d-flex  justify-content-end align-items-end mb-2">
          <p className={message.status === Contrast.UNCHECK?
                "answer--sent-check":
                message.status === Contrast.WRONG?
                "answer--sent-wrong":
                message.status === Contrast.CORRECT?
                "answer--sent-correct":""
          }>{message.word}</p>
          <div
            style={{
              backgroundImage: `url(${
                you.avatar
              }`,
            }}
            className="accountAvtContainer"
          ></div>
        </div>
      )}
    </div>
  );
}

export default memo(Message);
