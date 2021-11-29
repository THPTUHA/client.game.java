import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { authorization } from "../../service/authorization";
import Loading from "../../loading/Loading";
import NavBar from "../navbar/NavBar";

export default function NewsDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/news/detail`,
        { id: id },
        authorization()
      );
      setLoading(true);
      setDetail(res.data.content);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return detail ? (
    <div>
      <NavBar />
      <div class="container">
        <div class="col-sm-12">
          <div className="grid newsDetail">
            <div dangerouslySetInnerHTML={{ __html: detail }} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
