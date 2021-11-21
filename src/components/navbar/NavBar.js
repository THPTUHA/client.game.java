import React, { useContext, useRef } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import Logout from "../authorization/Logout";
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
                          <div
                            style={{ backgroundImage: `url(${user.avatar}` }}
                            className="accountAvtContainer"
                          >
                            {/* <img className="accountAvatar" src={avatar} alt="" /> */}
                          </div>

                          <p className="m-0">{user.first_name}</p>
                        </div>
                      </div>
                    </Link>
                    <Logout/>
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
