import { UserContext } from "../../context/UserProvider";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState ,} from "react";
import { ReactQuillNoSSR } from "../form/NoSSR";
import OutsideClickDetect from "../form/OutsideClickDetect";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdTrash ,IoMdPause} from "react-icons/io";
import { AiFillEdit,AiFillDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { GoTriangleUp,GoTriangleDown } from "react-icons/go";
import axios from "axios";
import Help from "../../service/Help";
import { authorization } from "../../service/authorization";
import {Toast} from "../../service/Toast";
import Contrast from "../../Contrast";
import  Navbar  from "../navbar/NavBar";
import ChallengeItem from "./ChallengeItem";

export default function Challlenge() {
  const [challengs,setChallenges] = useState();
  useEffect(async()=>{
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/challenge`);
      setChallenges(res.data.challenges);
      console.log(res.data);
   }catch(err){
     Toast.error("Something wrong!!");
   }
  },[]);

  return (  
    <div>
      <Navbar/>
      {
        challengs?challengs.map((e,index)=>{
          return <ChallengeItem key={index} challenge={e}/>
        }):""
      }
    </div>
  );
}

 