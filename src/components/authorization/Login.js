import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import { authorization } from "../../service/authorization";
import NavBar from "../navbar/NavBar";
import Loading from "../../loading/Loading";

export default function Login() {
  const { updateGobleUser} = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [data, setData] = useState();
  const [loading,setLoading]= useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    updateGobleUser(data);
  }, [data]);

  const submit = async () => {
    setLoading(true);
    const data = { email: email, password: password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/login`,
        data
      );
      localStorage.setItem("token", JSON.stringify(response.data));
      try {
        const user = await axios.get("/user", authorization());
        user.data.avatar = user.data.avatar?user.data.avatar:`https://avatars.dicebear.com/api/micah/${user.first_name  + user.last_name}.svg`;
        setData(user.data);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      setError("Sai email hoặc password");
      console.log(err);
    }
    setLoading(false);
  };

  return  !loading?(
    !data ? (
      <>
        <NavBar />
        <div className="container">
          <div className="row">
            <div
              style={{ position: "relative", height: "90vh" }}
              className="col-sm-12"
            >
              <div style={{ height: "100vh" }} className="grid">
                <div className="form">
                  <form action="Login">
                    <p className="form__title">Đăng nhập</p>
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
                    <p className="text-danger">{error}</p>
  
                    <button
                      type="button"
                      className="Form__btn btn btn-warning"
                      onClick={submit}
                    >
                      Đăng nhập
                    </button>
                    <Link to="/register" className="form__signUp">
                      Tạo tài khoản
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) :<Redirect to="/"></Redirect>
  ):<Loading></Loading>
  
}
