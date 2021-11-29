import  React,{ useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../context/UserProvider";

export default function Logout(){
    const {updateGobleUser } = useContext(UserContext);
    const logout = ()=>{
        localStorage.removeItem("token");
        updateGobleUser("");
    }
    return (
        <div className="bg" onClick={logout}>
            <i className="fal fa-sign-out-alt"></i>
        </div>
    )
}
