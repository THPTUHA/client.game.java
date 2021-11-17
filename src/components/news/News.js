import React from "react";

export default function News() {
  return (
    <div className="blog">
      <a href="/">
        <img
          src="https://kenh14cdn.com/2020/2/24/photo-1-15825282172301099647419.jpg"
          alt=""
        />
        <p className="title">Những game mới ra mắt</p>
      </a>
      <p className="summary">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem non
        doloremque dolore rem repudiandae alias nulla necessitatibus!
      </p>
      <div className="d-flex">
        <div className="d-flex align-items-center m-1">
          <i className="fas fa-user-circle"></i>
          <p className="author">Nghia</p>
        </div>
        <div className="d-flex align-items-center">
          <i className="far fa-calendar-alt"></i>
          <p className="date">21-10-2021</p>
        </div>
      </div>
    </div>
  );
}
