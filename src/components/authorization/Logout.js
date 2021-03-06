import  React,{ useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../context/UserProvider";

export default function Logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    const {updateDataUser} = useContext(UserContext);
    useEffect(()=>{
        updateDataUser("");
    },[]);
    return <Redirect to="/"/>;
}