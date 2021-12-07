import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Play from "./Play";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { authorization } from "../../../service/authorization";
import nhac from "../../../assets/mp3/lmht.mp3";
import { UserContext } from "../../../context/UserProvider";
import Frame from "../Frame";
function GameXO() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const requestStart = async () => {
    setLoading(true);
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(`/topic/xo/wating/${user.id}`, function (response) {
        const res = JSON.parse(response.body);
        console.log(res);
        stompClient.disconnect();
        setData({ ...res, user_id: user.id });
        setLoading(false);
      });
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/xo/start`,
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
        <h3>Cờ Caro </h3>
        <div className="row h-100">
          <div className="col-12">
            <div className=" h-100 mb-4">
              {!data ? (
                <div class="container-fluid h-100">
                  <div class="row h-100">
                    <div class="col-12 h-100  position-relative">
                      <Frame user={user} />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "5rem",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                        className="d-flex justify-content-center mt-5"
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
                    </div>
                  </div>
                </div>
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

export default GameXO;
