import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const getDay = (time) => {
  const date = time.split("T");
  return date[0];
};

export default function News({ index, e }) {
  return (
    <div key={index}>
      <Link to={`/news/detail/${e.id}`}>
        <div className="blog mb-5">
          <div>
            <div
              style={{ backgroundImage: `url(${e.background_image}` }}
              className="NewsImgContainer"
            ></div>
          </div>
          <div className="blogInfo">
            <p className="title">{e.title}</p>
            <p className="summary">{e.describes}</p>
            <div className="d-flex ">
              <div className="d-flex align-items-center m-1">
                <i className="fas fa-user-circle"></i>
                <p className="author">{e.user_name}</p>
              </div>
              <div className="d-flex align-items-center ">
                <i className="far fa-clock"></i>
                <p className="date">{getDay(e.time_create)}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
