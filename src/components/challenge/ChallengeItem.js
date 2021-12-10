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
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Help from "../../service/Help";
import {ImArrowUp,ImArrowDown} from "react-icons/im";
import { authorization } from "../../service/authorization";
import {Toast} from "../../service/Toast";
import Contrast from "../../Contrast";
import { useParams } from "react-router-dom";
import Loading from "../../loading/Loading";
import CommentBox from "./Comment/CommentBox";
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

const handleListComment = (comment,id)=>{
  const object ={content:comment.content,user:{avatar:comment.avatar,name:comment.name},since:comment.since};
  let comments = JSON.parse(localStorage.getItem(`challenge${id}`)) || [];
  comments = [...comments,object];
  localStorage.setItem(`challenge${id}`, JSON.stringify(comments));
  return comments;

}

export default function Challlenge() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [up,setUp]= useState();
  const [down,setDown]= useState();
  const [stompClient,setStompClient] = useState();
  const [challenge,setChallenge] = useState();
  const [list_comment,setListComment]= useState([]);

  useEffect(async () => {
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(
        `/topic/challenge/comment/${id}`,
        function (response) {
          const res = JSON.parse(response.body);
          setListComment(handleListComment(res,id));
      })});
    
    setStompClient(stompClient);
    try {
      const formData = new FormData();
      formData.append("challenge_id", id);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/challenge/detail`,
        formData,
        authorization()
      );
        console.log(res.data);
        setChallenge(res.data);
        setUp(handleInteraction(res.data.interactions,Contrast.UP));
        setDown(handleInteraction(res.data.interactions,Contrast.DOWN));
        console.log(res.data.comments);
      localStorage.setItem(`challenge${id}`, JSON.stringify(res.data.comments));
      setListComment(res.data.comments);
    } catch (err) {
      Toast.error("Something worng!!");
    }
    return ()=>{
      stompClient.disconnect();
    }
  }, []);

  useEffect(()=>{
    return ()=>{
      if(stompClient)
      stompClient.disconnect();
    }
  },[stompClient]);

  const [open,setOpen] = useState({
    "advantage":false,
    "difficult":false,
    "strength":false,
    "defect":false,
  });
  const hanldeOpen = (name)=>{
    switch (name){
      case "advantage":
        setOpen({...open,"advantage":!open[name]});
        break;
      case "difficult":
        setOpen({...open,"difficult":!open[name]});
        break;
      case "strength":
        setOpen({...open,"strength":!open[name]});
        break;
      case "defect":
        setOpen({...open,"defect":!open[name]});
        break;
     }
 }

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

  const handleUp = async()=>{
    const formData = new FormData();
    formData.append("challenge_id", challenge.id);
    formData.append("status", Contrast.UP);
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/challenge/interaction`,formData,authorization());
      const data = res.data;
      console.log(res.data);

      if(res.data.status==Contrast.SUCCESS){
        if(data.message==="0")setUp(up-1);
        else if(data.message==="1")setUp(up+1);
        else if(data.message==="2"){
          setUp(up+1);
          setDown(down-1);
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleDown =async ()=>{
    const formData = new FormData();
    formData.append("challenge_id", challenge.id);
    formData.append("status", Contrast.DOWN);
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/challenge/interaction`,formData,authorization());
      const data = res.data;
      console.log(res.data);

      if(res.data.status==Contrast.SUCCESS){
        if(data.message==="0")setDown(down-1);
        else if(data.message==="1")setDown(down+1);
        else if(data.message==="2"){
          setUp(up-1);
          setDown(down+1);
        }
      }
    }catch(err){
      console.log(err);
    }
  }
  return (  
    <div>
     {challenge&&stompClient?(<div className={`${handleColor()} ml-10 mb-5 inline-block shadow hover:shadow-md  transition-all cursor-pointer rounded-md px-3 py-2  mt-5 `}>
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
            <label className="ml-2 text-base font-medium text-gray-600 mb-1.5 block">Mục tiêu</label>
            <label className="ml-2 text-base font-medium text-gray-900 mb-1.5 block">{challenge.target}</label>
          </div>
       </div>
       <div>
       <div className="ml-2 text-base font-medium text-gray-600 mb-1.5 block">Mô tả</div>
         <div dangerouslySetInnerHTML={{ __html: challenge.content }} />
       </div>

    <div className={` mt-2  outline-none focus:outline-none  rounded-lg bg-gray-100  border-4 border-transparent focus:border-primary transition-all`}>
    <label className="ml-2 text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Thời gian</label> 
      <div className=" flex w-full justify-between outline-none px-2 focus:outline-none rounded-lg bg-gray-100 border-transparent focus:border-primary transition-all">
          <div className="outline-none focus:outline-none px-2 py-1 rounded-lg bg-pink-300  border-4 border-transparent focus:border-primary transition-all">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Bắt đầu</label>
                  <div className="mt-2 flex ">
                      <div className="flex-2">
                          <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Ngày</label>
                              <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                                  type="date"
                                  name="since"
                                  placeholder={"date"}
                                  value={Help.getDateInputFormat(challenge.start)}                              />
                          </div>
                          <div className="flex-2 ml-5">
                              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Giờ</label>
                                  <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                                      type="time"
                                      name="since"
                                      placeholder={"time"}
                                      value={Help.getFormatTime(challenge.start)}
                                  />
                          </div>
                  </div>
          </div>
        
        <div className=" outline-none focus:outline-none px-2 py-1 rounded-lg bg-purple-300  ml-2 border-4 border-transparent focus:border-primary transition-all">
            <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Kết thúc</label>
                <div className="mt-2 flex ">
                    <div className="flex-2">
                        <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Ngày</label>
                            <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                                type="date"
                                name="since"
                                placeholder={"date"}
                                value={Help.getDateInputFormat(challenge.end)}
                            />
                        </div>
                        <div className="flex-2 ml-5">
                            <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Giờ</label>
                                <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                                    type="time"
                                    name="since"
                                    placeholder={"time"}
                                    value={Help.getFormatTime(challenge.end)}
                                />
                        </div>
                </div>
          </div>
       </div>
      </div>


      <div className="mt-2  outline-none focus:outline-none  rounded-lg bg-gray-100  border-4 border-transparent focus:border-primary transition-all">
      <label className="ml-2 text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Đánh giá năng lực</label>
       <div className=" flex w-full justify-between outline-none focus:outline-none px-2 ">
          <div className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-pink-300  border-4 border-transparent focus:border-primary transition-all">
             <div className="flex">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Ưu điểm</label>
              {
                open.strength?<GoTriangleUp className="ml-2 mt-1" onClick={()=>{hanldeOpen("strength")}}/>
                :<GoTriangleDown className="ml-2 mt-1" onClick={()=>{hanldeOpen("strength")}}/>
              }
             </div>
                  {
                    open.strength?(
                      <div>
                        {
                          challenge.strengths.map((e,index)=>{
                           if(e) return (
                              <div key={index} className="flex rounded-lg  text-base font-medium text-gray-600 px-2 bg-pink-200 mb-1.5 block">
                               <div> {index+1}- {e}</div>
                              </div>
                            )
                          })
                        }
                      </div>
                    ):""
                  }
          </div>
        
        <div className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-purple-300  ml-2 border-4 border-transparent focus:border-primary transition-all">
        <div className="flex">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Nhược điểm</label>
              {
                open.defect?<GoTriangleUp className="ml-2 mt-1" onClick={()=>{hanldeOpen("defect")}}/>
                :<GoTriangleDown className="ml-2 mt-1" onClick={()=>{hanldeOpen("defect")}}/>
              }
             </div>
                  {
                    open.defect?(
                      <div>
                        {
                          challenge.defects.map((e,index)=>{
                            if(e)return (
                              <div key={index} className="flex rounded-lg  text-base font-medium text-gray-600 px-2 bg-purple-200 mb-1.5 block">
                               <div> {index+1}- {e}</div>
                              </div>
                            )
                          })
                        }
                      </div>
                    ):""
                  }
          </div>
       </div>
       </div>

       <div className="mt-2  outline-none focus:outline-none  rounded-lg bg-gray-100  border-4 border-transparent focus:border-primary transition-all">
      <label className="ml-2 text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Đánh giá hoàn cảnh</label>
      <div className=" flex w-full justify-between outline-none focus:outline-none px-2 ">
          <div className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-pink-300  border-4 border-transparent focus:border-primary transition-all">
             <div className="flex">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Thuận lợi</label>
              {
                open.advantage?<GoTriangleUp className="ml-2 mt-1" onClick={()=>{hanldeOpen("advantage")}}/>
                :<GoTriangleDown className="ml-2 mt-1" onClick={()=>{hanldeOpen("advantage")}}/>
              }
             </div>
                  {
                    open.advantage?(
                      <div>
                        {
                          challenge.advantages.map((e,index)=>{
                            return (
                              <div key={index} className="flex rounded-lg  text-base font-medium text-gray-600 px-2 bg-pink-200 mb-1.5 block">
                               <div> {index+1}- {e}</div>
                              </div>
                            )
                          })
                        }
                       
                      </div>
                    ):""
                  }
          </div>
        
        <div className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-purple-300  ml-2 border-4 border-transparent focus:border-primary transition-all">
        <div className="flex">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Khó khăn</label>
              {
                open.difficult?<GoTriangleUp className="ml-2 mt-1" onClick={()=>{hanldeOpen("difficult")}}/>
                :<GoTriangleDown className="ml-2 mt-1" onClick={()=>{hanldeOpen("difficult")}}/>
              }
             </div>
                  {
                    open.difficult?(
                      <div>
                        {
                          challenge.difficults.map((e,index)=>{
                            return (
                              <div key={index} className="flex rounded-lg  text-base font-medium text-gray-600 px-2 bg-purple-200 mb-1.5 block">
                               <div> {index+1}- {e}</div>
                              </div>
                            )
                          })
                        }
                      </div>
                    ):""
                  }
          </div>
       </div>
    </div>
    <div className="flex mt-2">
        <div className="flex">
            <ImArrowUp onClick={handleUp}/>
            <div className="ml-1">{up}</div>
        </div>
        <div className="flex ml-5">
             <ImArrowDown onClick={handleDown}/>
             <div className="ml-1">{down}</div>
        </div>
    </div>
    <CommentBox user={user}  list_comment={list_comment} challenge_id={id}/>
  </div>):<Loading/>}
   </div>
  );
}

 