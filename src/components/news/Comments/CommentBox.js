import React, { useContext, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import { authorization } from "../../../service/authorization";
import { Toast } from "../../../service/Toast";

export default function CommentBox({user,list_comment,news_id}) {
  const [comment,setComment] =  useState("");
  const handleComment = async(e) => {
    if (comment === "") return;
    if (e.key === "Enter" || e.type === "click") {
      try{
        const data ={news_id:news_id, content:comment, name:user.first_name+" "+user.last_name,avatar:user.avatar};
        await axios.post(`${process.env.REACT_APP_SERVER}/news/comment`,data,authorization());
      }catch(err){
         Toast.error("Something wrong!!");
      }
      setComment("");
    }
  };

  return (
    <div class="container-fluid pt-5 pb-5 commentBox">
      <div className="row grid">
        <div class="col-12 w-75 ">
          <p className="counter">{list_comment.length} bình luận</p>
        </div>
        <div class="col-12 w-75 ">
          <div className="d-flex align-items-center ">
            <div
              style={{
                backgroundImage: `url(${user.avatar}`,
                width: "4rem",
                height: "4rem",
                marginRight: "1rem",
                borderRadius: "unset",
              }}
              className="accountAvtContainer"
            ></div>
            <div onKeyPress={handleComment}>
              <input
                type="text"
                class="form-control m-0 h-100  "
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="Thêm bình luận..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <i className="fas fa-arrow-circle-right " onClick={handleComment}></i>
            </div>
          </div>
        </div>
        <div class="col-12 w-75 ">
        {
          list_comment?list_comment.map((e,index)=>{
          return (
            <Comment key={index} user={e.owner} since={e.since} content={e.content}/>
          )}):""
        }
         
        </div>
      </div>
    </div>
  );
}
