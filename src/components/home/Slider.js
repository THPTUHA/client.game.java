import { UserContext } from "../../context/UserProvider";
import React, { Component, useContext } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import vid from "../../assets/img/animated-zed-odyssey-intro.mp4";
import { Link } from "react-router-dom";
import gialap from "../../assets/img/gialap.mp4";
import rumbe from "../../assets/img/rumble.mp4";
import img from "../../assets/img/LOLBg.jpg";
function DemoCarousel() {
  const { user } = useContext(UserContext);

  return (
    <Carousel  >
      <div className="-top-0 -left-0">
        <div className="-top-0 -left-0">
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
        </div>{" "}
        <Link to={!user ? "login" : "/gameplay"} className="">
          <div className="header__btn myBtn">
            <i className="fas fa-gamepad"></i>
            Chơi ngay
          </div>
        </Link>
      </div>
      <div>
        <div
          style={{
            position: "relative",
          }}
          className="zed d-block w-100"
        >
          <div className="zed__backGround"></div>
          <video className="zed__video" playsInline loop muted autoPlay>
            <source src={rumbe} type="video/mp4" />
          </video>
          <div className="zed__titles">
            <p className="zed__title1">Game hot</p>
            <p className="zed__title2">Thực chiến</p>
            <p className="zed__title3">Cuộc đời như một tựa game</p>

            <div style={{ position: "relative", padding: "3rem 0" }}>
              <p className="zed__title1">BY Thập cẩm</p>
              <p className="zed__title4">10 DECEMBER 2021</p>
            </div>
          </div>
        </div>{" "}
        <Link to={!user ? "login" : "/challenge"} className="">
          <div className="header__btn myBtn">
            <i className="fas fa-gamepad"></i>
            Bắt đầu ngay
          </div>
        </Link>
      </div>
      <div>
        <div
          style={{
            position: "relative",
          }}
          className="zed d-block w-100"
        >
          <div className="zed__backGround"></div>
          <video className="zed__video" playsInline loop muted autoPlay>
            <source src={gialap} type="video/mp4" />
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
      </div>
    </Carousel>
  );
}

export default DemoCarousel;
