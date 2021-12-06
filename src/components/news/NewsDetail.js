import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { authorization } from "../../service/authorization";
import Loading from "../../loading/Loading";
import NavBar from "../navbar/NavBar";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {Toast} from "../../service/Toast";

export default function NewsDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [comment,setComment] =  useState("");
  const [list_comment,setListComment]= useState([]);

  // const handleComment = ()=>{
  //   localStorage.setItem("answers", JSON.stringify(mess));

  // }

  const handleComment = async(e) => {
    if (comment === "") return;
    if (e.key === "Enter" || e.type === "click") {
      try{
        const data ={news_id:id, content:comment};
        const res = await axios.post(`${process.env.REACT_APP_SERVER}/news/comment`,data,authorization());
        setListComment(res.data);
      }catch(err){
         Toast.error("Something wrong!!");
      }
      setComment("");
    }
  };

  useEffect(async () => {
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(
        `/topic/news/comment/${id}`,
        function (response) {
          const res = JSON.parse(response.body);
          
      })});
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/news/detail`,
        { id: id },
        authorization()
      );
      // setComment(res.data.list_comment);
      setDetail(res.data.content);
      console.log(res.data);
    } catch (err) {
      Toast.error("Something worng!!");
    }
    return ()=>{
      stompClient.disconnect();
    }
  }, []);
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
      <div className="d-flex" onKeyPress={handleComment}>
        <input
          placeholder="Comment..."
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <i className="fas fa-arrow-circle-right " onClick={handleComment}></i>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
