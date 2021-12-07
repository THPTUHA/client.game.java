import React from "react";
import boderAvt from "../../assets/img/boderAvt.png";
import rankImg from "../../assets/img/rank.png";

export default function Frame({ user }) {
  return (
    <div className="position-relative frameContainer">
      <div className="frame ">
        <p className="frame__name">{user.first_name + " " + user.last_name}</p>
        <div className="grid">
          <div className="avt grid">
            {" "}
            <img
              className="avt__img"
              src={user.avatar ? user.avatar : ""}
              alt=""
            />
          </div>
        </div>
      </div>
      <img className="frame__rank" src={rankImg} alt="" />
    </div>
  );
}
