import React from "react";
import NavBar from "../navbar/NavBar";

export default function Admin() {
  return (
    <div>
      <NavBar />
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div className="mb-2">
              <a className="btn btn-primary" href="/admin/user" role="button">
                Quản lý người dùng
              </a>
            </div>
            <a className="btn btn-primary" href="/admin/news" role="button">
              Quản lý bài viết
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
