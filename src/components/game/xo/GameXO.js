import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient;
let id_game = 1;
let ans;

function GameXO({ user }) {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [map, setMap] = useState();
  const [winner, setWinner] = useState();
  function creactMap(
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
  ) {
    const temp = board.map((row, index) => {
      return (
        <div style={{ height: "8rem" }} key={index}>
          {row.map((ele, index1) => {
            console.log(index, index1);
            return ele == 1 ? (
              <div className="o" key={index1}>
                <p>X</p>
              </div>
            ) : ele == 2 ? (
              <div className="o" key={index1}>
                <p>O</p>
              </div>
            ) : (
              <div
                className="o"
                onClick={() => {
                  sendAction(
                    index.toString(),
                    index1.toString(),
                    ans.data.type,
                    ans.data.id_match
                  );
                }}
                key={index1}
              >
                <p> </p>
              </div>
            );
          })}
        </div>
      );
    });
    setMap(temp);
  }

  function userWinner(winner) {
    setWinner(
      winner == 1 ? (
        <h1>User 1 Win</h1>
      ) : winner == 2 ? (
        <h1>User 2 Win</h1>
      ) : (
        <h1>Đang hòa</h1>
      )
    );
  }
  function connect(id_match) {
    var socket = new SockJS("http://localhost:8080/gameplay");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe(
        `/topic/xo/${id_game}/${id_match}`,
        function (response) {
          let data = JSON.parse(response.body);
          console.log(JSON.parse(response.body));
          creactMap(data.board);
          userWinner(data.winner);
        }
      );
    });
  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }

    console.log("Disconnected");
  }

  function sendAction(x, y, type, id_match) {
    console.log("send to:", id_match);
    const play = {
      coordinateX: x,
      coordinateY: y,
      type: type,
      id_match: id_match,
    };
    if (stompClient)
      stompClient.send(
        `/app/xo/${id_game}/${id_match}`,
        {},
        JSON.stringify(play)
      );
  }

  const submitForm = async () => {
    try {
      ans = await axios.post("http://localhost:8080/xo/start", {
        id_user: user.id,
      });
      connect(ans.data.id_match);
      creactMap();
      console.log(ans.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="">
      <div class="row">
        <div class="col-12 col-lg-6">
          <div className=" mb-4">
            <button className="btn btn-info " onClick={submitForm}>
              Start
            </button>
            <button className="btn btn-danger" onClick={disconnect}>
              End
            </button>
          </div>
          <div className="grid">{map}</div>
          {winner}
        </div>
      </div>
    </div>
  );
}

export default GameXO;
