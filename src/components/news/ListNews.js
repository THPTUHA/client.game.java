import React from "react";
import News from "./News";
import SmallNewsBox from "./SmallNewsBox";

export default function ListNews() {
  return (
    <div class="container-fluid">
      <div class="row pt-5">
        <div class="col-sm-8">
          <div class="container">
            <div class="row">
              <News />
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="container-fluid smallBlogs">
            <div class="row">
              <div class="col-sm-12">
                <a
                  class="btn btn-primary"
                  href="/dangBaiViet.jsp"
                  role="button"
                >
                  Đăng bài
                </a>
                <p class="sessionTitle">BÀI VIẾT GẦN ĐÂY</p>
              </div>
            </div>
          </div>
          <div class="smallBlog blog container-fluid">
            <div class="row">
              <SmallNewsBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
