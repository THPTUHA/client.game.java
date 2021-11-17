import React, { memo, useState, useEffect, useRef } from "react";
import Message from "./Message";

const id_game = 1;
function ChatBox({ data }) {
  const [mes, setMes] = useState("");
  const handleMessage = () => {
    data.stompClient.send(
      `/app/xo/${id_game}/${data.id_match}`,
      {},
      JSON.stringify({ id_match: data.id_match, type: data.type, message: mes })
    );
    setMes("");
  };
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <div className="chatBox mt-lg-4 ">
      <h3>Trò chuyện</h3>
      <div className="content mt-1 mb-2 ">
        {data.messages.map((e, index) => {
          return (
            <>
              {" "}
              <Message key={index} message={e} is_chat={data.type == e.type} />
            </>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="d-flex">
        <input
          placeholder="Aa"
          type="text"
          onChange={(e) => setMes(e.target.value)}
          value={mes}
        />
        <i className="far fa-arrow-circle-right " onClick={handleMessage}></i>
      </div>
    </div>
  );
}

export default memo(ChatBox);
