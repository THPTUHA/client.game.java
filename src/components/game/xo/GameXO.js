import axios from "axios";
import React, { useState } from "react";
import Play from "./Play";

function GameXO({ user }) {
  const [data, setData] = useState();
  // console.log("GameXO");

  // function connect(id_match, start) {}

  // function disconnect() {
  //   if (stompClient !== null) {
  //     stompClient.disconnect();
  //   }

  //   console.log("Disconnected");
  // }

  const requestStart = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/xo/start`, {
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
    <>
      <div className="container-fluid game">
        <h1>Cờ Caro </h1>
        <div className="row">
          <div className="col-12">
            <div className=" mb-4">
              {!data ? (
                <button className="btn btn-info " onClick={requestStart}>
                  Tìm trận
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
    </>
  );
}

export default GameXO;
