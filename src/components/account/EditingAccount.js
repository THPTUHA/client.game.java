import { React, useState } from "react";
import UpdateInfo from "./UpdateInfo";
import UpdatePassword from "./UpdatePassword";

export default function EditingAccount() {
  const [option, setOption] = useState(1);
  return (
    <div className="container-fluid">
      <div class="row pt-5">
        <div class="col-4">
          <button
            onClick={() => setOption(1)}
            type="button"
            class="btn btn-primary shadow-none"
          >
            Sửa thông tin
          </button>
          <br />
          <button
            onClick={() => setOption(2)}
            type="button"
            class="btn btn-success shadow-none mt-2"
          >
            Đổi mật khẩu
          </button>
        </div>
        <div class="col-8">
          {option == 1 ? <UpdateInfo /> : <UpdatePassword />}
        </div>
      </div>
    </div>
  );
}
