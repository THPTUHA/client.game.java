import  React,{ useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../context/UserProvider";

export default function Logout(){
    localStorage.removeItem("token");
    const {updateDataUser} = useContext(UserContext);
    updateDataUser("");
    return <Redirect to="/"/>;
}
