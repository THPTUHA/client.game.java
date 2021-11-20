import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { authorization } from "../service/authorization";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("unload");
  useEffect(() => {
     (async()=>{
          try {
            const user = await axios.get("/user", authorization());
            console.log("Goi lai");
            user.avatar = user.avatar?user.avatar:`https://avatars.dicebear.com/api/micah/${user.first_name + " " + user.last_name}.svg`;
            setUser(user.data);
        } catch (err) {
          setUser("");
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
