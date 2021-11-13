import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import StyledInput from "../styledComponents/StyledInput";
export default function Register() {
  const [email, setEmail] = useState("");
  const [eWarning, setEWarning] = useState("");
  const [pWarning, setPWarning] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rWarning, setRWarning] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fWarning, setFWarning] = useState("");
  const [lastName, setLastName] = useState("");
  const [lWarning, setLWarning] = useState("");
  const [sex, setSex] = useState("1");
  const [ok, setOk] = useState(false);
  const checkEmail = (val) => {
    if (val === "") {
      setEWarning("*Bắt buộc");
      return false;
    } else {
      let s = "";
      for (const element of val) {
        if (
          (element <= "z" && element >= "a") ||
          (element <= "9" && element >= "0")
        ) {
          continue;
        }
        s += element;
      }
      if (s !== "@.") {
        setEWarning("*Email sai định dạng");
        return false;
      }
      setEWarning("");
      return true;
    }
  };
  const checkRePassword = (val) => {
    if (val === "") {
      setRWarning("*Bắt buộc");
      return false;
    }
    if (rePassword !== password) {
      setRWarning("*Mật khẩu nhập lại không khớp");
      return false;
    } else setRWarning("");
    return true;
  };
  const checkFirstName = () => {
    if (firstName === "") {
      setFWarning("*Bắt buộc");
      return false;
    }
    setFWarning("");
    return true;
  };
  const checkLastName = () => {
    if (lastName === "") {
      setLWarning("*Bắt buộc");
      return false;
    }
    setLWarning("");
    return true;
  };
  const checkPassword = () => {
    if (password === "") {
      setPWarning("*Bắt buộc");
      return false;
    }
    setPWarning("");
    return true;
  };
  const submit = async () => {
    if (
      !checkEmail(email) &&
      !checkRePassword(rePassword) &&
      !checkFirstName() &&
      !checkPassword() &&
      !checkLastName()
    )
      return;
    const data = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      sex: parseInt(sex),
    };
    try {
      const res = await axios.post("http://localhost:8080/register", data);
      console.log(res.data);
      setOk(true);
      alert("Đăng ký thành công!");
    } catch (err) {
      console.log(err);
    }
  };
  if (ok) return <Redirect to="/login" />;
  return (
    <div className="container">
      <div class="row">
        <div
          style={{ position: "relative", height: "100vh" }}
          class="col-sm-12"
        >
          <div class="grid">
            <div className="form pt-5 pb-5">
              <form action="Login">
                <p class="form__title">Đăng ký</p>

                <StyledInput
                  theme={{
                    main: eWarning !== "" ? "red" : "gray",
                    bg: eWarning !== "" ? "#F9ADA0" : "white",
                  }}
                  onBlur={(e) => {
                    checkEmail(e.target.value);
                  }}
                  className="mb-3"
                  type="email"
                  placeholder="Nhập email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <p className="text-danger">{eWarning}</p>
                <StyledInput
                  theme={{
                    main: fWarning !== "" ? "red" : "gray",
                    bg: fWarning !== "" ? "#F9ADA0" : "white",
                  }}
                  className="mb-3"
                  type="text"
                  placeholder="Nhập tên"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  onBlur={() => checkFirstName()}
                />
                <p className="text-danger">{fWarning}</p>

                <StyledInput
                  theme={{
                    main: lWarning !== "" ? "red" : "gray",
                    bg: lWarning !== "" ? "#F9ADA0" : "white",
                  }}
                  className="mb-3"
                  type="text"
                  placeholder="Nhập họ"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  onBlur={() => checkLastName()}
                />
                <p className="text-danger">{lWarning}</p>

                <div
                  onChange={(e) => {
                    if (e.target.defaultValue === "nam") {
                      setSex("1");
                    } else {
                      setSex("0");
                    }
                  }}
                >
                  <div className="d-flex mb-2">
                    <div className="d-flex align-items-center ">
                      <input
                        style={{ margin: "0", width: "unset" }}
                        id="nam"
                        type="radio"
                        name="sex"
                        checked={sex === "1"}
                        value="nam"
                      />
                      <label className="p-2" for="nam">
                        Nam
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        style={{ margin: "0", width: "unset" }}
                        id="nu"
                        type="radio"
                        name="sex"
                        value="nu"
                        checked={sex === "0"}
                      />
                      <label className="p-2" for="nu">
                        Nữ
                      </label>
                    </div>
                  </div>
                </div>

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
                  onBlur={() => checkPassword()}
                />
                <br />
                <p className="text-danger">{pWarning}</p>

                <StyledInput
                  theme={{
                    main: rWarning !== "" ? "red" : "gray",
                    bg: rWarning !== "" ? "#F9ADA0" : "white",
                  }}
                  type="password"
                  className="mb-3"
                  placeholder="Nhập lại mật khẩu"
                  onChange={(e) => {
                    setRePassword(e.target.value);
                  }}
                  onBlur={(e) => {
                    checkRePassword(e.target.value);
                  }}
                />
                <p className="text-danger">{rWarning}</p>
                <button
                  type="button"
                  className="Form__btn btn btn-warning shadow-none"
                  onClick={submit}
                >
                  Submit
                </button>
                <Link to="/login" class="form__signUp">
                  Đăng nhập
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
