import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

import { Link } from "react-router-dom";
import headerImg from "../../assets/img/game.png";
export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="header">
          <div className="container">
            <div className="row">
              <img className="header__img" src={headerImg} alt="" />
            </div>
          </div>

          <Link to={!user ? "login" : "/gameplay"} className="">
            <div className="header__btn myBtn">
              <i className="fas fa-gamepad"></i>
              Chơi ngay
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
