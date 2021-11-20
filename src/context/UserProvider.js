import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { authorization } from "../service/authorization";
import { Redirect } from "react-router";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("unload");
  useEffect(() => {
    (async () => {
      try {
        const auth = authorization();
        // console.log(auth);
        if (auth != "NO") {
          const user = await axios.get("/user", auth);
          console.log("Goi lai");
          setUser(user.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log(err);
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
