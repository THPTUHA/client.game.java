import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { authorization } from "../service/authorization";

export const UserContext=createContext();


const UserProvider=({children})=>{
    console.log("oooo............");
    const[user,setUser]=useState();
    useEffect(()=>{
        const email = JSON.parse(localStorage.getItem("email"));
        (async()=>{
            try{
                const auth = authorization({params: email});
                if(auth!=="NO")
                {
                    const user = await axios.get("/user",auth);
                    console.log("Goi lai");
                    setUser(user.data);
                }
              }catch(err){
                console.log(err);
            }
        })();
    },[]);
    const updateDataUser=(user)=>{
        setUser(user);
    }
    const userContextData={
        user,updateDataUser
    }
    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;