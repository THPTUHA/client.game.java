import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Play from "./Play";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { authorization } from "../../../service/authorization";
import nhac from "../../../assets/mp3/lmht.mp3";
import { UserContext } from "../../../context/UserProvider";
import Frame from "../Frame";

function ConctedWord({ user }) {
  // console.log(user);
  // const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);
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
      setStompClient(stompClient);
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
      <div className="container-fluid game ">
        <h1>Nối từ </h1>
        <div className="row h-100">
          <div className="col-12 h-100">
            <div className="h-100 mb-4">
              {!data && stompClient ? (
                <>
                  <Frame user={user} />
                  <div
                    style={{
                      position: "relative",
                      top: "5rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                    className="d-flex justify-content-center mt-2"
                  >
                    {loading ? (
                      <div>
                        <audio playsInline loop autoPlay>
                          <source src={nhac} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        <div className="gameRoom__btn ">
                          {" "}
                          <div className="d-flex align-items-center">
                            {" "}
                            <h6>Đang tìm trận</h6>
                            <i className="fad fa-spinner-third"></i>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="gameRoom__btn  "
                        onClick={requestStart}
                      >
                        TÌM TRẬN
                      </button>
                    )}
                  </div>
                </>
              ) : (
                data && <Play data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConctedWord;
