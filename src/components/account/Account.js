import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

export default function Account() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div class="container-fluid padding-2">
      {user && (
        <div class="row pt-3">
          <div class="col-sm-4">
            <div className="position-relative">
              <div class="info d-flex flex-column">
                <div class="d-flex justify-content-center">
                  <img
                    class="accountAvatar"
                    src={`https://avatars.dicebear.com/api/micah/${
                      user.first_name + " " + user.last_name
                    }.svg`}
                    alt=""
                  />
                </div>
                <p class="name">{user.first_name + " " + user.last_name}</p>
                <p className="content">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="content">
                  <strong>Giới tính:</strong> {user.sex == 1 ? "Nam" : "Nữ"}
                </p>
                <p className="content">
                  <strong>Gold:</strong> {user.gold}
                </p>
                <p className="content">
                  <strong>Exp:</strong> {user.exp}
                </p>
                <a
                  href="account/edit"
                  class="btn btn-primary active"
                  role="button"
                >
                  Cập nhật thông tin
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="row">
              <strong>Lịch sử đấu</strong>
            </div>
            <div class="row pt-3">
              <table class="table">
                <thead>
                  <tr>
                    <th>Đối thủ</th>
                    <th>Thời gian</th>
                    <th>Kết quả</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">Nghia</td>
                    <td>11-11-2021</td>
                    <td>Thắng</td>
                  </tr>
                  <tr>
                    <td scope="row">Nghia</td>
                    <td>11-11-2021</td>
                    <td>Thua</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
