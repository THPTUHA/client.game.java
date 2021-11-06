import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import logo from "../../assets/img/logo.png";
export default function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <div className="container-fluid padding-0">
      <div class="row myNavbar padding-lg">
        <div class="col-3 d-flex align-items-center">
          <div class="">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
        </div>
        <div class="col-6 padding-0" style={{ textAlign: "center" }}>
          {/* <div class="searchForm">
            <form class="" action="/search/" method="get">
              <input
                id="search"
                autocomplete="off"
                name="q"
                class="searchInput"
                type="search"
                placeholder="Bạn tìm gì..."
                aria-label="Search"
                onblur="document.getElementById('closeSearch').click();"
              />
            </form>
            <i id="closeSearch" class="fal fa-times"></i>
          </div> */}
          <div class="main">
            <ul class="d-flex">
              <li class="d-flex align-items-center">
                <Link to="/">Trang chủ</Link>
              </li>
              <li class="d-flex align-items-center">
                <a href="/news/">Tin tức</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-3 padding-0">
          <div class="menu pl-5 pr-5">
            <ul class="d-flex justify-content-end">
              <li class="d-flex align-items-center ">
                {!user ? (
                  <Link to="/login/">Đăng nhập</Link>
                ) : (
                  <>
                    <Link to="account">
                      <div style={{ marginRight: "2rem" }} class="bg">
                        <i class="far fa-user"></i>
                      </div>
                    </Link>
                    <Link to="/logout">
                      <div class="bg">
                        <i class="fal fa-sign-out-alt"></i>
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
