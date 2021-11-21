import  React,{ useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../context/UserProvider";

export default function Logout(){
    const {updateDataUser } = useContext(UserContext);
    const logout = ()=>{
        localStorage.removeItem("token");
        updateDataUser("");
    }
    return (
        <div className="bg" onClick={logout}>
            <i className="fal fa-sign-out-alt"></i>
        </div>
    )
}
