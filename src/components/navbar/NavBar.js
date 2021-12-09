import React, { memo, useContext, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import Logout from "../authorization/Logout";
import logo from "../../assets/img/logo.png";

function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <div className="container-fluid padding-0 ">
      <div className="row myNavbar padding-lg">
        <div className="col-3 d-flex align-items-center ">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div
          className="col-9 col-sm-6 padding-0"
          style={{ textAlign: "center" }}
        >
          <div className="main">
            <ul className="d-flex">
              <li className="d-flex align-items-center">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="d-flex align-items-center">
                <Link to="/news">Tin tức</Link>
              </li>
              {user && user.role === "ROLE_ADMIN" ? (
                <li className="d-flex align-items-center">
                  <Link to="/admin">ADMIN</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
        <div className="col-12 col-sm-3 padding-0">
          <div className="menu pl-5 pr-5">
            <ul className="d-flex justify-content-center justify-content-lg-end">
              <li className="d-flex align-items-center ">
                {user === "unload" || !user ? (
                  <Link to="/login/">
                    <div className="p-sm-3 p-lg-0">
                      <div
                        style={{
                          backgroundColor: "rgb(11, 196, 226)",
                          padding: "0.5rem 1rem",
                          borderRadius: "3px",
                        }}
                      >
                        <p className="m-0">
                          <strong>Đăng nhập</strong>
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link to="/account">
                      <div className="pt-sm-2 pb-sm-2 p-lg-0">
                        <div
                          style={{ marginRight: "2rem" }}
                          className="bgAccount"
                        >
                          <div className="d-flex  justify-content-center align-items-center">
                            <div
                              style={{ backgroundImage: `url(${user.avatar}` }}
                              className="accountAvtContainer"
                            ></div>

                            <p className="m-0">{user.first_name} </p>
                            <div> </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Logout />
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

export default memo(NavBar);
