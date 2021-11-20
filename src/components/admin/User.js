import React from "react";
import NavBar from "../navbar/NavBar";

export default function User() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Đăng nhập gần nhất</th>
                  <th>Chức vụ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">test@gmail.com</td>
                  <td>1</td>
                  <td>
                    <select name="" id="">
                      <option value="">Admin</option>
                      <option value="">Người dùng</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td scope="row">hehe@gmaic.om</td>
                  <td>tes</td>
                  <td>
                    <select name="" id="">
                      <option value="">Admin</option>
                      <option value="">Người dùng</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-12">
            <button type="button" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
