import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Play from "./Play";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { authorization } from "../../../service/authorization";
import nhac from "../../../assets/mp3/lmht.mp3";
import { UserContext } from "../../../context/UserProvider";

function ConctedWord({ user }) {
  console.log(user);
  // const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user !== "unload") {
      const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        stompClient.subscribe(
          `/topic/cw/wating/${user.id}`,
          function (response) {
            const res = JSON.parse(response.body);
            console.log(res);
            setData({ ...res, user_id: user.id });
            setLoading(false);
            stompClient.disconnect();
          }
        );
      });
    }
  }, [user]);
  const requestStart = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/cw/start`,
        {},
        authorization()
      );
    } catch (err) {
      console.log(err);
    }
  };

  //  (async () => {
  //     console.log(user);
  //     if (user.status>0) {
  //       setLoading(true);
  //       try {
  //         const res = await axios.post(
  //           `${process.env.REACT_APP_SERVER}/xo/reload`,
  //           {
  //             match_id: user.status,
  //           }
  //         );
  //         console.log(res.data);
  //         setData({...res.data,user_id:user.id});
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     setLoading(false);
  //   }) ();

  // const { user } = useContext(UserContext);
  // console.log(user);
  // if (!user) return <Redirect to="/login" />;
  return (
    <>
      <div className="container-fluid game">
        <h1>Nối từ </h1>
        <div className="row">
          <div className="col-12">
            <div className=" mb-4">
              {loading ? (
                <div className="d-flex align-items-center">
                  <audio playsInline loop autoPlay>
                    <source src={nhac} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <h3>Đang tìm trận</h3>
                  <i className="fad fa-spinner-third"></i>
                </div>
              ) : !data ? (
                <button className="btn btn-info " onClick={requestStart}>
                  Tìm trận
                </button>
              ) : (
                <Play data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConctedWord;
