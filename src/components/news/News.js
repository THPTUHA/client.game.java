import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authorization } from "../../service/authorization";
import NewsDetail from "./NewsDetail";
import Loading from "../../loading/Loading";

const getDay = (time)=>{
  console.log(time);
  const date = time.split("T");
  return date[0];
}
export default function News() {
  const [news,setNews] =useState();
  const [detail,setDetail] = useState();

  useEffect(async()=>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/news`,{},authorization());
      console.log(res.data);
      setNews(res.data);
    }catch(err){

    }
  },[]);

  const readDetail = (e)=>{
      setDetail(e.content);
  }
  return (
         detail?(
           <div>
             <NewsDetail detail={detail}/>
             <button onClick={(e)=>{readDetail("")}}>Quay lại</button>
           </div>
         ): 
         news?news.map((e,index)=>{
            return (
              <div key={index}>
                <Link to={`/news/detail/${e.id}`}>
                  <div className="blog" >
                  <div >
                    <img
                      src={e.background_image}
                      alt=""
                    />
                    <p className="title">{e.title}</p>
                  </div>        
                  <div className="d-flex">
                      <div className="d-flex align-items-center m-1">
                        <i className="fas fa-user-circle"></i>
                        <p className="author">{e.user_name}</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="far fa-calendar-alt"></i>
                        <p className="date">{getDay(e.time_create)}</p>
                      </div>
                  </div>
                </div>
                </Link>
              </div>
            )
         }):<Loading/>
  );
}
