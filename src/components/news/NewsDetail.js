import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { authorization } from "../../service/authorization";
import Loading from "../../loading/Loading";
import NavBar from "../navbar/NavBar";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {Toast} from "../../service/Toast";
import { UserContext } from "../../context/UserProvider";
import Help from "../../service/Help";
import CommentBox from "./Comments/CommentBox";

const handleListComment = (comment,id)=>{
  const object ={content:comment.content,owner:{avatar:comment.avatar,name:comment.name},since:comment.since};
  let comments = JSON.parse(localStorage.getItem(`news${id}`)) || [];
  comments = [...comments,object];
  localStorage.setItem(`news${id}`, JSON.stringify(comments));
  return comments;

}

export default function NewsDetail() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [list_comment,setListComment]= useState([]);
  const [stompClient,setStompClient] = useState();

  useEffect(async () => {
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(
        `/topic/news/comment/${id}`,
        function (response) {
          const res = JSON.parse(response.body);
          setListComment(handleListComment(res,id));
      })});
    
    setStompClient(stompClient);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/news/detail`,
        { id: id },
        authorization()
      );
      localStorage.setItem(`news${id}`, JSON.stringify(res.data.comment));
      setListComment(res.data.comment);
      setDetail(res.data.content);
    } catch (err) {
      Toast.error("Something worng!!");
    }
    return ()=>{
      console.log("FUCK");
      stompClient.disconnect();
    }
  }, []);

  useEffect(()=>{
    return ()=>{
      if(stompClient)
      stompClient.disconnect();
    }
  },[stompClient]);
  return detail ? (
    <div>
      <NavBar />
      <div className="container">
        <div className="col-sm-12">
          <div className="grid newsDetail">
            <div dangerouslySetInnerHTML={{ __html: detail }} />
          </div>
        </div>
      </div>
      <CommentBox user={user} list_comment={list_comment} news_id={id}/>
    </div>
  ) : (
    <Loading />
  );
}
