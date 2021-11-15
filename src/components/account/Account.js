import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

export default function Account() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="container-fluid">
      <div className="row pt-3">
        <div className="col-sm-4">
          <div className="position-relative">
            <div className="info d-flex flex-column">
              <div className="d-flex justify-content-center">
                <img
                  className="accountAvatar"
                  src={`https://avatars.dicebear.com/api/micah/${user.first_name+ user.last_name}.svg`}
                  alt=""
                />
              </div>
              <p className="name">{user.first_name+" "+ user.last_name}</p>
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
              <a href="#" className="btn btn-primary active" role="button">
                Cập nhật thông tin
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="row">
            <strong>Lịch sử đấu</strong>
          </div>
          <div className="row pt-3">
            <table className="table">
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
    </div>
  );
}

