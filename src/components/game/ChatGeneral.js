import React, { memo, useState, useEffect, useRef } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Message from "../chat/Message";
import Contrast from "../../Contrast";
import chatSound from "../../assets/mp3/discord.mp3";
import { authorization } from "../../service/authorization";
import Loading from "../../loading/Loading";

function ChatGeneral({ user_id }) {
  const [audio] = useState(new Audio(chatSound));
  const [data, setData] = useState();
  const [playing, setPlaying] = useState(false);
  const [stompClient, setstompClient] = useState();
  const [mes, setMes] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMes, setNewMes] = useState(false);

  const handleLoadingChat = async (e) => {
    if (e.target.scrollTop === 0) {
      const req = { pos: data.length };
      try {
        setLoading(true);
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER}/gameplay/chat/loading`,
          req,
          authorization()
        );
        setData([...res.data, ...data]);
        setLoading(false);
      } catch (err) {}
    }
  };

  const handleMessage = (e) => {
    if (mes === "") return;
    if (e.key === "Enter" || e.type === "click") {
      setPlaying(false);
      stompClient.send(
        "/app/chat",
        {},
        JSON.stringify({
          user_id: user_id,
          message: mes,
          status: Contrast.MESSAGE,
        })
      );
      setMes("");
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    // if (data && data[data.length - 1].user_id == user_id) scrollToBottom();
    var element = document.getElementById("chattong");
    if (element) element.scrollTop = element.scrollHeight;
    if (playing) audio.play();
    setPlaying(true);
  }, [data, stompClient]);

  useEffect(async () => {
    const socket = new SockJS(`${process.env.REACT_APP_SERVER}/gameplay`);
    const stompClient = await Stomp.over(socket);
    await stompClient.connect({}, async function (frame) {
      await stompClient.subscribe(`/topic/chat`, function (response) {
        const res = JSON.parse(response.body);
        setData(res);
      });
    });
    setstompClient(stompClient);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/gameplay/chat`,
        authorization()
      );
      console.log(res);
      setData(res.data);
    } catch (err) {}
  }, []);

  useEffect(() => {
    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, [stompClient]);

  return (
    <div className="chatBox mt-lg-4 ">
      <h3>Trò chuyện</h3>
      {data && stompClient ? (
        <div>
          <div
            id="chattong"
            onScroll={handleLoadingChat}
            className="content mt-1 mb-2 "
          >
            {" "}
            {data.map((e, index) => {
              return (
                <Message
                  key={index}
                  message={e}
                  is_chat={user_id === e.user_id}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="d-flex" onKeyPress={handleMessage}>
            <input
              placeholder="Aa"
              type="text"
              onChange={(e) => setMes(e.target.value)}
              value={mes}
            />
            <i
              className="fas fa-arrow-circle-right "
              onClick={handleMessage}
            ></i>
          </div>
        </div>
      ) : (
        <div className="content mt-1 mb-2 ">
          <Loading height={50} width={50} heightContainer={"100%"} />
        </div>
      )}
    </div>
  );
}

export default memo(ChatGeneral);
