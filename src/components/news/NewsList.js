import React from "react";
import News from "./News";
import SmallNewsBox from "./SmallNewsBox";

export default function ListNews() {
  return (
    <div className="container-fluid ">
      <div className="row pt-5">
        <div className="col-8 padding-0">
          <div className="container">
            <div className="row">
              <News />
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="container-fluid smallBlogs padding-0">
            <div className="row">
              <div className="col-sm-12">
                <a
                  className="btn btn-primary"
                  href="/dangBaiViet.jsp"
                  role="button"
                >
                  Đăng bài
                </a>
                <p className="sessionTitle">BÀI VIẾT NỔI BẬT</p>
              </div>
            </div>
          </div>
          <div className="smallBlog blog container-fluid padding-0">
            <div className="row">
              <SmallNewsBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
