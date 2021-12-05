import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import vid from "../../assets/img/animated-zed-odyssey-intro.mp4";
import { Link } from "react-router-dom";
import headerImg from "../../assets/img/game.png";
export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="header p-0">
          <div
            style={{
              position: "relative",
            }}
            className="zed"
          >
            <div className="zed__backGround"></div>
            <video className="zed__video" playsInline loop muted autoPlay>
              <source src={vid} type="video/mp4" />
            </video>
            <div className="zed__titles">
              <p className="zed__title1">NEW GAME</p>
              <p className="zed__title2">League Of Legends</p>
              <p className="zed__title3">The Biggest Autumn/Winter 2021 Game</p>

              <div style={{ position: "relative", padding: "3rem 0" }}>
                <p className="zed__title1">BY RIOT GAMES</p>
                <p className="zed__title4">11 NOVEMBER 2021</p>
              </div>
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
