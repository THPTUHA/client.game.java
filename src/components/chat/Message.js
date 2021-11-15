import React from "react";

export default function Message({message}) {
  return (
    <div className="d-flex  align-items-center mb-2">
      <img
        // class="accountAvatar"
        src={`https://avatars.dicebear.com/api/micah/${"nghianguyen"}.svg`}
        alt=""
      />
      <h5>
        {message}
      </h5>
    </div>
  );
}
