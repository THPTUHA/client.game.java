import React from "react";
import NavBar from "../navbar/NavBar";
import { Link } from "react-router-dom";

export default function News() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Link to="/admin/news/post">Đăng bài</Link>
          </div>
          <div className="col-sm-12">
            <table className="table">
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
                      className="btn btn-primary"
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
                    <Link to="/admin/news/update">Sửa</Link>
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
