import axios from "axios";
import React, { useState } from "react";
export default function Register() {
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const submit = async()=>{
    const data={email:email,password:password};
    try{
      const res = await axios.post("https://4643-2402-800-61b3-a7ce-9d7b-602-3b25-1b02.ngrok.io/register",data);
      console.log(res.data);
    }catch(err){
      console.log(err);
    }
  }
  return (
   <div>
     <div>Email</div>
     <input type="text" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
     <div>Password</div>
     <input type="text" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}/>
     <button onClick={submit}>Submit</button>
   </div>
  );
}
