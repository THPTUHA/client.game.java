import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { authorization } from "../service/authorization";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("unload");
  useEffect(() => {
     (async()=>{
          try {
            const athu = authorization();
            if(athu){
              console.log(athu);
              const user = await axios.get(`${process.env.REACT_APP_SERVER}/user`, athu);
              console.log("Goi lai");
              user.data.avatar = user.data.avatar?user.data.avatar:`https://avatars.dicebear.com/api/micah/${user.data.first_name  + user.data.last_name}.svg`;
              localStorage.removeItem("answers");
              console.log(user.data);
              setUser(user.data);
            }
        } catch (err) {
          setUser("");
          console.log(err);
       
        }
     })();
  }, []);
  const updateDataUser = (user) => {
    user =user;
  };

  const updateGobleUser =(user) =>{
    setUser(user);
  }
  const userContextData = {
    user,
    updateDataUser,
    updateGobleUser
  };
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
