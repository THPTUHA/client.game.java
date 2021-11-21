import { React, useState, useContext } from "react";
import { UserContext } from "../../context/UserProvider";

import StyledInput from "../styledComponents/StyledInput";

export default function UpdateInfo() {
  const { user } = useContext(UserContext);

  const [sdtWarning, setSdtWarning] = useState("");
  const [sdt, setSdt] = useState(user.phone);
  const [moTa, setMoTa] = useState(user.discription);
  const submit = () => {
    if (!checkSdt()) return;
  };
  const checkInput = (str) => {
    if (!str) {
      return false;
    }
    return true;
  };
  const checkSdt = () => {
    if (!sdt) return true;
    if (parseInt(sdt) === sdt) {
      setSdtWarning("");
      return true;
    } else setSdtWarning("Không đúng định dạng");
    return false;
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div style={{ position: "relative" }} className="col-sm-12">
            <div className="">
              <div className="form w-75 w-lg-50 pt-2 pb-5">
                <form action="">
                  <p className="form__title">Chỉnh sửa thông tin</p>
                  Số điện thoại:
                  <StyledInput
                    theme={{
                      main: sdtWarning !== "" ? "red" : "gray",
                      bg: sdtWarning !== "" ? "#F9ADA0" : "white",
                    }}
                    type="text"
                    className="mb-3"
                    placeholder="Số điện thoại"
                    value={sdt}
                    onChange={(e) => {
                      setSdt(e.target.value);
                    }}
                    onBlur={() => {
                      checkSdt();
                    }}
                  />
                  <br />
                  <p className="text-danger">{sdtWarning}</p>
                  Mô tả
                  <StyledInput
                    theme={{
                      main: "gray",
                      bg: "white",
                    }}
                    type="text"
                    className="mb-3"
                    placeholder="Mô tả"
                    onChange={(e) => {
                      setMoTa(e.target.value);
                    }}
                    value={moTa}
                  />
                  <button
                    type="button"
                    className="Form__btn btn btn-warning shadow-none"
                    onClick={submit}
                  >
                    Cập nhật
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
