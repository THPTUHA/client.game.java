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
import { Link } from "react-router-dom";
import Loading from "../../loading/Loading";
import Item from "./Item";
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
      <Link to="/challenge/create">
        <button className="fixed border-2 font-medium text-gray-600 px-2 py-2 bg-green-200 rounded-lg">Tạo mục tiêu</button>
      </Link>
     <div className="flex flex-swap">
     {
        challengs?challengs.map((e,index)=>{
          return  (
            <div key={index}>
              <Link to={`/challenge/${e.id}`}>
              <Item  challenge={e}/>
              </Link>
          </div>
          )
        }):<Loading/>
      }
     </div>
    </div>
  );
}

 