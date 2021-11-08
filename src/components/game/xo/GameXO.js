import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Play from "./Play";
import BoardXO from "./BoardXO";

const id_game = 1;
let ans;
let stompClient;

function GameXO({ user }) {
  const [status, setStatus] = useState(0);
  const [map, setMap] = useState();
  const [winner, setWinner] = useState();
  const [data, setData] = useState();

  function waiting() {
    return <h1>Chờ đối thủ....</h1>;
  }

  function connect(id_match, start) {}

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }

    console.log("Disconnected");
  }

  const requestStart = async () => {
    try {
      const res = await axios.post("http://localhost:8080/xo/start", {
        id_user: user.id,
      });
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // const { user } = useContext(UserContext);
  // console.log(user);
  // if (!user) return <Redirect to="/login" />;
  return (
    <div className="">
      <div class="row">
        <div class="col-12 col-lg-6">
          <div className=" mb-4">
            {!data ? (
              <button className="btn btn-info " onClick={requestStart}>
                Start
              </button>
            ) : (
              <Play data={data} />
            )}
            {/* <button className="btn btn-danger" >
              End
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameXO;
