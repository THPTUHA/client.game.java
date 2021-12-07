import { UserContext } from "../../context/UserProvider";
import React, { useContext, useEffect } from "react";

export default function Challlenge() {
  const { user } = useContext(UserContext);

  return (
    <div className="container-fluid">
      <div class="row w-50">
        <div class="col-12">
          <div className="postStatus">
            <p className="title"> Tạo bài viết</p>
            <hr />
            <div className="main">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    backgroundImage: `url(${user.avatar}`,
                    width: "4rem",
                    height: "4rem",
                    marginRight: "1rem",
                  }}
                  className="accountAvtContainer"
                >
                  <div
                    style={{
                      width: "4rem",
                      height: "4rem",
                    }}
                  ></div>
                </div>
                <p className="name">{user.first_name + " " + user.last_name}</p>
              </div>
              <input
                className="mb-3"
                id="statusInput"
                type="text"
                placeholder={`${user.first_name} ơi, bạn đang nghĩ gì thế?`}
              />
              <div className="optionBox d-flex align-items-center justify-content-between">
                <p className="options__title">Thêm vào bài viết</p>
                <div className="option">
                  <i style={{ color: "#5B8C5A" }} class="far fa-images"></i>
                  <i style={{ color: "#E6B89C" }} class="far fa-laugh"></i>
                  <i
                    style={{ color: "#E3655B" }}
                    class="fas fa-map-marker-alt"
                  ></i>
                </div>
              </div>
              <button type="button" class="btn btn-primary w-100">
                Đăng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
