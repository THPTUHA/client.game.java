import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../loading/Loading";
import { authorization } from "../../service/authorization";
import NewsDetail from "./NewsDetail";
import NavBar from "../navbar/NavBar";
import News from "./News";
import SmallNewsBox from "./SmallNewsBox";
import {Toast} from "../../service/Toast";

export default function ListNews() {
  const [news, setNews] = useState();

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/news`,
        {},
        authorization()
      );
      setNews(res.data);
    } catch (err) {
      console.log(err);
      Toast.error("Something wrong!!")
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="container ">
        <div className="row pt-5">
          <div className="col-8 padding-0">
            <div className="container">
              <div className="row NewsList ">
                {news ? (
                  news.map((e, index) => {
                    return (
                      <div className="col-sm-12" key={index}>
                        <div>
                          <Link to={`/news/detail/${e.id}`}>
                            <News index={index} e={e} />
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="container-fluid smallBlogs padding-0">
              <div className="row">
                <div className="col-sm-12">
                  <p className="sessionTitle">BÀI VIẾT NỔI BẬT</p>
                </div>
              </div>
            </div>
            <div className="smallBlog blog container-fluid padding-0">
              <div className="row">
                <SmallNewsBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
