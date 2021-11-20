import React from "react";
import NavBar from "../navbar/NavBar";

export default function News() {
  return (
    <div>
      <NavBar />
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <a
              className="btn btn-primary"
              href="/admin/news/post"
              role="button"
            >
              Đăng bài
            </a>
          </div>
          <div class="col-sm-12">
            <table class="table">
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Mô tả</th>
                  <th>Nội dung</th>
                  <th>Ảnh</th>
                  <th>Người đăng</th>
                  <th>Chỉnh sửa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">test@gmail.com</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <a
                      name=""
                      id=""
                      class="btn btn-primary"
                      href="/admin/news/update"
                      role="button"
                    >
                      Sửa
                    </a>
                  </td>
                </tr>
                <tr>
                  <td scope="row">hehe@gmaic.om</td>
                  <td>tes</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>
                    <a
                      name=""
                      id=""
                      class="btn btn-primary"
                      href="/admin/news/update"
                      role="button"
                    >
                      Sửa
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
