import React, { memo } from "react";
function Message({ message, is_chat }) {
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
                message.avatar
                  ? message.avatar
                  : `https://avatars.dicebear.com/api/micah/${message.name}.svg`
              }`,
            }}
            className="accountAvtContainer"
          ></div>
          <div className="d-flex flex-column">
            <p style={{ fontSize: "0.5rem", marginLeft: "0.5rem" }}>
              {message.user_name}
            </p>
            <p className="message--received">{message.message}</p>
          </div>
        </div>
      ) : (
        <div className="d-flex  justify-content-end align-items-end mb-2">
          <p className="message--sent">{message.message}</p>
          <div
            style={{
              backgroundImage: `url(${
                message.avatar
                  ? message.avatar
                  : `https://avatars.dicebear.com/api/micah/${message.name}.svg`
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
