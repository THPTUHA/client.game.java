import React from "react";

export default function SmallNewsBox() {
  return (
    <>
      <div className="col-sm-5">
        <a href="/">
          <img
            src="https://kenh14cdn.com/2020/2/24/photo-1-15825282172301099647419.jpg"
            alt=""
          />
        </a>
      </div>
      <div className="col-sm-7">
        <div>
          <a href="/">
            {" "}
            <p className="title">Những game hot năm 2021</p>
          </a>

          <div className="d-flex">
            <div className="d-flex align-items-center">
              <i className="far fa-calendar-alt"></i>
              <p className="date">21-10-2021</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
