import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import {
  CarouselCaption,
  CarouselItem,
  CarouselControl,
  Carousel,
  UncontrolledCarousel,
  CarouselIndicators,
} from "reactstrap";
import Slider from "./Slider";
import vid from "../../assets/img/animated-zed-odyssey-intro.mp4";
import { Link } from "react-router-dom";
import gialap from "../../assets/img/gialap.mp4";
import rumbe from "../../assets/img/rumbe.mp4";
import img from "../../assets/img/LOLBg.jpg";
import { Toast } from "../../service/Toast";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="container-fluid">
      <div class="row p-0">
        <div class="col-12 p-0">
          {" "}
          <Slider />
        </div>
        {/* <div class="col-12 p-0">
          <div
            id="carouselExampleControls"
            class="carousel slide p-0"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div
                  style={{
                    position: "relative",
                  }}
                  className="zed d-block w-100"
                >
                  <div className="zed__backGround"></div>
                  <video className="zed__video" playsInline loop muted autoPlay>
                    <source src={vid} type="video/mp4" />
                  </video>
                  <div className="zed__titles">
                    <p className="zed__title1">NEW GAME</p>
                    <p className="zed__title2">League Of Legends</p>
                    <p className="zed__title3">
                      The Biggest Autumn/Winter 2021 Game
                    </p>

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
              <div class="carousel-item">
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
                    <p className="zed__title1">NEW GAME</p>
                    <p className="zed__title2">League Of Legends</p>
                    <p className="zed__title3">
                      The Biggest Autumn/Winter 2021 Game
                    </p>

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
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div> */}
      </div>
      {/* <div className="row">
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
      </div> */}
    </div>
  );
}
