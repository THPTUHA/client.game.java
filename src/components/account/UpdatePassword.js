import axios from "axios";
import { React, useState } from "react";
import { authorization } from "../../service/authorization";
import StyledInput from "../styledComponents/StyledInput";

export default function UpdatePassword() {
  const [pWarning, setPWarning] = useState("");
  const [password, setPassword] = useState("");
  const [nPassword, setNPassword] = useState("");
  const [nWarning, setNWarning] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [rWarning, setRWarning] = useState("");

  const submit =async ()=>{
    console.log(password,nPassword,rPassword);
    if(rPassword === nPassword){
      console.log("OK");
      const data ={password:password,new_password:nPassword}
      try{
        const res = await axios.post(`${process.env.REACT_APP_SERVER}/user/change_password`,
        data,
        authorization());
        console.log(res.data)
      }catch(err){

      }
    }
  }
  const checkInput = (str) => {
    if (str === "") {
      return false;
    }
    return true;
  };
  const checkRPassword = (val) => {
    if (val === "") {
      setRWarning("*Bắt buộc");
      return false;
    }
    if (rPassword !== nPassword) {
      setRWarning("*Mật khẩu nhập lại không khớp");
      return false;
    } else setRWarning("");
    return true;
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div style={{ position: "relative" }} className="col-sm-12">
            <div className="">
              <div className="form w-75 w-lg-50 pt-2 pb-5">
                <form action="">
                  <p className="form__title">Đổi mật khẩu</p>
                  <StyledInput
                    theme={{
                      main: pWarning !== "" ? "red" : "gray",
                      bg: pWarning !== "" ? "#F9ADA0" : "white",
                    }}
                    type="password"
                    className="mb-3"
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onBlur={() => {
                      if (checkInput(password)) setPWarning("");
                      else setPWarning("*Bắt buộc");
                    }}
                  />
                  <br />
                  <p className="text-danger">{pWarning}</p>

                  <StyledInput
                    theme={{
                      main: nWarning !== "" ? "red" : "gray",
                      bg: nWarning !== "" ? "#F9ADA0" : "white",
                    }}
                    type="password"
                    className="mb-3"
                    placeholder="Nhập mật khẩu mới"
                    onChange={(e) => {
                      setNPassword(e.target.value);
                    }}
                    onBlur={() => {
                      if (checkInput(nPassword)) setNWarning("");
                      else setNWarning("*Bắt buộc");
                    }}
                  />
                  <p className="text-danger">{nWarning}</p>
                  <StyledInput
                    theme={{
                      main: rWarning !== "" ? "red" : "gray",
                      bg: rWarning !== "" ? "#F9ADA0" : "white",
                    }}
                    type="password"
                    className="mb-3"
                    placeholder="Nhập lại mật khẩu"
                    onChange={(e) => {
                      setRPassword(e.target.value);
                    }}
                    // onBlur={(e) => {
                    //   checkRPassword(e.target.value);
                    // }}
                  />
                  <p className="text-danger">{rWarning}</p>
                  <button
                    type="button"
                    className="Form__btn btn btn-warning shadow-none"
                    onClick={submit}
                  >
                    Submit
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
