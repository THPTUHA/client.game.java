import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserProvider";
import NavBar from "../navbar/NavBar";
import { Link } from "react-router-dom";
import FormData from "form-data";
import { authorization } from "../../service/authorization";
// const FormData = require('form-data');

export default function Account() {
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState(user.avatar);
  const [new_avatar, setNewAvatar] = useState();

  console.log(user);
  const submit = async () => {
    console.log(new_avatar[0]);
    const formData = new FormData();
    formData.append("new_avatar", new_avatar[0]);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/update_avatar`,
        formData,
        authorization()
      );
      console.log(res);
      setAvatar(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row pt-3">
          <div className="col-sm-4">
            <div className="position-relative">
              <div className="info d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    style={{ backgroundImage: `url(${avatar}` }}
                    className="accountAvtContainer"
                  >
                    {/* <img className="accountAvatar" src={avatar} alt="" /> */}
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      setNewAvatar(e.target.files);
                    }}
                  />
                  <button className="btn btn-warning" onClick={submit}>
                    Save
                  </button>
                </div>
                <p className="name">{user.first_name + " " + user.last_name}</p>
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
                <p className="content">
                  <strong>Status:</strong> {user.status}
                </p>
                <Link to="/account/edit">
                  <button type="button" class="btn btn-primary">
                    {" "}
                    Cập nhật thông tin
                  </button>
                </Link>
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
                    <td>Nghia</td>
                    <td>11-11-2021</td>
                    <td>Thắng</td>
                  </tr>
                  <tr>
                    <td>Nghia</td>
                    <td>11-11-2021</td>
                    <td>Thua</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
