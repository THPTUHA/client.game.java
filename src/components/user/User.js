import axios from "axios";
import { useEffect, useState } from "react";
import { authorization } from "../../service/authorization";

export default function User(){
    const[data,setData]=useState();
    const getData = async()=>{
        try{
          const res = await axios.get("/user",authorization());
          setData(res.data);
        }catch(err){
          console.log(err);
        }
     }
    useEffect(()=>{
        getData();
    },[]);
    return (
        <h1>{data}</h1>
    )
}