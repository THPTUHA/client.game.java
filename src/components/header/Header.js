import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

import { Link } from "react-router-dom";
import headerImg from "../../assets/img/game.png";
export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="container-fluid">
      <div class="row">
        <div class="header">
          <div class="container">
            <div class="row">
              <img class="header__img" src={headerImg} alt="" />
            </div>
          </div>
          <div class="header__btn myBtn">
            <i class="fas fa-gamepad"></i>
            <Link to={!user ? "login" : "/gameplay"} class="">
              Chơi ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
