import React from "react";
import Message from "./Message";

export default function ChatBox() {
  return (
    <div className="chatBox mt-lg-4">
      <h3>Chat Box</h3>
      <div className="content mt-1 mb-2">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="d-flex">
        <input type="text" />
        <i className="far fa-arrow-circle-right "></i>
      </div>
    </div>
  );
}
