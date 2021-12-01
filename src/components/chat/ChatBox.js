import React, { memo, useState, useEffect, useRef } from "react";
import Message from "./Message";
import Contrast from "../../Contrast";
import chatSound from "../../assets/mp3/discord.mp3";

const id_game = 1;
function ChatBox({ data }) {
  const [audio] = useState(new Audio(chatSound));
  const [playing, setPlaying] = useState(false);
  const [mes, setMes] = useState("");
  const handleMessage = (e) => {
    console.log(mes);
    if (mes === "") return;
    if (e.key === "Enter" || e.type === "click") {
      setPlaying(false);
      data.stompClient.send(
        data.url,
        {},
        JSON.stringify({
          match_id: data.match_id,
          user_id: data.user_id,
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
    // if (data.messages.length !== 0) scrollToBottom();
    var element = document.getElementById("trochuyen");
    element.scrollTop = element.scrollHeight;
    console.log(playing);
    if (playing) audio.play();
    setPlaying(true);
  }, [data.messages]);

  return (
    <div className="chatBox mt-lg-4 ">
      <h3>Trò chuyện</h3>
      <div id="trochuyen" className="content mt-1 mb-2 ">
        {data.messages.map((e, index) => {
          return (
            <Message
              key={index}
              message={e}
              is_chat={data.user_id === e.user_id}
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
        <i className="fas fa-arrow-circle-right " onClick={handleMessage}></i>
      </div>
    </div>
  );
}

export default memo(ChatBox);
