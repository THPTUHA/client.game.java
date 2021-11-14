import React from "react";

export default function News() {
  return (
    <div class="blog">
      <a href="/">
        <img
          src="https://kenh14cdn.com/2020/2/24/photo-1-15825282172301099647419.jpg"
          alt=""
        />
        <p class="title">Những game mới ra mắt</p>
      </a>
      <p class="summary">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem non
        doloremque dolore rem repudiandae alias nulla necessitatibus!
      </p>
      <div class="d-flex">
        <div class="d-flex align-items-center m-1">
          <i class="fas fa-user-circle"></i>
          <p class="author">Nghia</p>
        </div>
        <div class="d-flex align-items-center">
          <i class="far fa-calendar-alt"></i>
          <p class="date">21-10-2021</p>
        </div>
      </div>
    </div>
  );
}
