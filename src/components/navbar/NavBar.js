import React, { useContext } from "react";

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
          {/* <div className="searchForm">
            <form className="" action="/search/" method="get">
              <input
                id="search"
                autocomplete="off"
                name="q"
                className="searchInput"
                type="search"
                placeholder="Bạn tìm gì..."
                aria-label="Search"
                onblur="document.getElementById('closeSearch').click();"
              />
            </form>
            <i id="closeSearch" className="fal fa-times"></i>
          </div> */}
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
                      <div style={{ marginRight: "2rem" }} className="bg">
                        <i className="far fa-user"></i>
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
    </div>
  );
}
