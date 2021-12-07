import React from "react";
import Help from "../../../service/Help";

export default function Comment({ user, since,content }) {
  return (
    <div className="d-flex align-items-start mt-3 comment">
      <div
        style={{
          backgroundImage: `url(${user.avatar}`,
          width: "4rem",
          height: "4rem",
          marginRight: "1rem",
          borderRadius: "unset",
        }}
        className="accountAvtContainer"
      >
        <div
          style={{
            width: "4rem",
            height: "4rem",
          }}
        ></div>
      </div>
      <div>
        <div className="d-flex align-items-center">
          <p className="name ">{user.name}</p>
          <p className="time">{Help.getDay(since)}</p>
        </div>
        <div className="">
          {" "}
          <p className="content">
           {content}
          </p>
        </div>
      </div>
    </div>
  );
}
