import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [ok, setOk] = useState(false);
  const submit = async () => {
    const data = { email: email, password: password };
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
          <div class="form">
            <form action="Login">
              <p class="form__title">Đăng ký</p>
              <input
                className="mb-3"
                type="text"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <input
                type="password"
                className="mb-3"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <button
                type="button"
                className="Form__btn btn btn-warning"
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
      {/* <div>Email</div>
      <input
        type="text"
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div>Password</div>
      <input
        type="text"
        placeholder="Enter your password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={submit}>Submit</button> */}
    </div>
  );
}
