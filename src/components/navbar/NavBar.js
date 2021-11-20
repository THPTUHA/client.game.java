import React, { useContext, useRef } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import logo from "../../assets/img/logo.png";
export default function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <div className="container-fluid padding-0">
      <div className="row myNavbar padding-lg">
        <div className="col-3 d-flex align-items-center">
          <div className="">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
        </div>
        <div className="col-6 padding-0" style={{ textAlign: "center" }}>
          <div className="main">
            <ul className="d-flex">
              <li className="d-flex align-items-center">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="d-flex align-items-center">
                <Link to="/news">Tin tức</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-3 padding-0">
          <div className="menu pl-5 pr-5">
            <ul className="d-flex justify-content-end">
              <li className="d-flex align-items-center ">
                {!user ? (
                  <Link to="/login/">Đăng nhập</Link>
                ) : (
                  <>
                    <Link to="/account">
                      <div
                        style={{ marginRight: "2rem" }}
                        className="bgAccount"
                      >
                        <div className="d-flex  justify-content-center align-items-center">
                          <img
                            style={{
                              width: "1.5rem",
                              borderRadius: "50%",
                              backgroundColor: "white",
                              marginRight: "3px",
                            }}
                            src={`https://avatars.dicebear.com/api/micah/${
                              user.first_name + " " + user.last_name
                            }.svg`}
                            alt=""
                          />
                          <p className="m-0">{user.first_name}</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/logout">
                      <div className="bg">
                        <i className="fal fa-sign-out-alt"></i>
                      </div>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="space"></div>
      </div>
    </div>
  );
}
