import { React, useState } from "react";
import NavBar from "../navbar/NavBar";
import UpdateInfo from "./UpdateInfo";
import UpdatePassword from "./UpdatePassword";

export default function EditingAccount() {
  const [option, setOption] = useState(1);
  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row pt-5">
          <div className="col-4">
            <button
              onClick={() => setOption(1)}
              type="button"
              className="btn btn-primary shadow-none"
            >
              Sửa thông tin
            </button>
            <br />
            <button
              onClick={() => setOption(2)}
              type="button"
              className="btn btn-success shadow-none mt-2"
            >
              Đổi mật khẩu
            </button>
          </div>
          <div className="col-8">
            {option === 1 ? <UpdateInfo /> : <UpdatePassword />}
          </div>
        </div>
      </div>
    </>
  );
}

