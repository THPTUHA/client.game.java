import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { authorization } from "../service/authorization";
import { Redirect } from "react-router";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("unload");
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    (async () => {
      try {
        const auth = authorization({ params: email });
        // console.log(auth);
        if (auth != "NO") {
          const user = await axios.get("/user", auth);
          console.log("Goi lai");
          setUser(user.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log("errors");

        // alert("Vui lòng đăng nhập");
      }
    })();
  }, []);
  const updateDataUser = (user) => {
    setUser(user);
  };
  const userContextData = {
    user,
    updateDataUser,
  };
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
