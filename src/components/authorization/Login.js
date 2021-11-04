import axios from "axios";
import React, { useContext,  useEffect,  useState } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../context/UserProvider";
import { authorization } from "../../service/authorization";

export default function Login() {
  const {updateDataUser} = useContext(UserContext);
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const[data,setData]=useState();
  useEffect(()=>{
    updateDataUser(data);
  },[data]);
  
  const submit = async()=>{
    const data={email:email,password:password};
    try{
     const response = await axios.post("http://localhost:8080/login",data);
     localStorage.setItem("user",JSON.stringify(response.data));
     localStorage.setItem("email",JSON.stringify({email:email}));
        try{
          const user = await axios.get("/user",authorization({params: { email:email }}));
          setData(user.data);
        }catch(err){
          console.log(err);
        }
    }catch(err){
      console.log(err);
    }
   
  }

  return (
     !data?(
      <div>
      <div>Email</div>
      <input type="text" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
      <div>Password</div>
      <input type="text" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={submit}>Submit</button>
    </div>
     ):(
        <Redirect to="/"></Redirect>
     )
  );
}
