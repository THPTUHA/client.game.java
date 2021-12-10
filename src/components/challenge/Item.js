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
import {ImArrowUp,ImArrowDown} from "react-icons/im";
import { authorization } from "../../service/authorization";
import {Toast} from "../../service/Toast";
import Contrast from "../../Contrast";
const SmallMenu = () => {
    const [open, setOpen] = useState(false);

    return (<>
        
    </>)
}

const handleInteraction = (interactions,status)=>{
  let count=0;
  for(let i=0;i<interactions.length;++i){
    if(status==interactions[i].status)count++;
  }
  return count;
}
export default function Item({challenge}) {
 const handleColor = ()=>{
    if(challenge.level==1)return "bg-green-400";
    if(challenge.level==2)return "bg-blue-400";
    if(challenge.level==3)return "bg-red-200";
    if(challenge.level==4)return "bg-red-400";
  }

  const handleText = ()=>{
    if(challenge.level==1)return "Dễ";
    if(challenge.level==2)return "Bình thường";
    if(challenge.level==3)return "Khó";
    if(challenge.level==4)return "Rất khó";
  }
  return (  
    <div>
     <div className={`${handleColor()} ml-10 mr-10 inline-block shadow hover:shadow-md  transition-all cursor-pointer rounded-md px-3 py-2  mt-5 `}>
       <div className="flex flex-swap">
        <div className="ml-2 text-base font-medium text-gray-600 mb-1.5 block">Cuộc chơi</div>
        <div className="ml-2 text-base font-medium text-black mb-1.5 block">{handleText()}</div>
       </div>
       <div className="d-flex  align-items-center">
        <div
            style={{ backgroundImage: `url(${challenge.user.avatar}` }}
            className="accountAvt object-scale-down  border-light-blue-500"
        ></div>
        <p className="ml-2 text-base font-medium text-black mb-1.5 block">{challenge.user.name} </p>
        <div> </div>
        </div>
       <div>
          <div>
            <label className="ml-2 text-base font-medium text-gray-900 mb-1.5 block">{challenge.target}</label>
          </div>
       </div>
  </div>
   </div>
  );
}

 