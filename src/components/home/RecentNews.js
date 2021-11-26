import News from "../news/News";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authorization } from "../../service/authorization";
import NewsDetail from "../news/NewsDetail";
import Loading from "../../loading/Loading";

export default function RecentNews() {
  const [news, setNews] = useState();
  const [detail, setDetail] = useState();

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/news`,
        {},
        authorization()
      );
      console.log(res.data);
      setNews(res.data);
    } catch (err) {}
  }, []);

  const readDetail = (e) => {
    setDetail(e.content);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div class="col-sm-12">
          <div className="blogs pt-5 pb-5">
            <p className="sessionTitle">BÀI VIẾT MỚI</p>
          </div>
        </div>
      </div>
      <div className="row">
        {news ? (
          news.map((e, index) => {
            return (
              <div key={index} class="col-sm-6 col-lg-4 recentNews">
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
  );
}
