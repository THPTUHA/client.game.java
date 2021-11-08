import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import { authorization } from "../../service/authorization";

export default function Login() {
  const { updateDataUser } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    updateDataUser(data);
  }, [data]);

  const submit = async () => {
    const data = { email: email, password: password };
    try {
      const response = await axios.post("http://localhost:8080/login", data);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("email", JSON.stringify({ email: email }));
      try {
        const user = await axios.get(
          "/user",
          authorization({ params: { email: email } })
        );
        setData(user.data);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return !data ? (
    <div className="container">
      <div class="row">
        <div
          style={{ position: "relative", height: "100vh" }}
          class="col-sm-12"
        >
          <div style={{ height: "100vh" }} className="grid">
            <div class="form">
              <form action="Login">
                <p class="form__title">Đăng nhập</p>
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
                <Link to="/register" class="form__signUp">
                  Tạo tài khoản
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/"></Redirect>
  );
}
