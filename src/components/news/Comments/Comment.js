import React from "react";

export default function Comment({ user }) {
  return (
    <div className="d-flex align-items-start mt-3 comment">
      <div
        style={{
          backgroundImage: `url(${user.avatar}`,
          width: "4rem",
          height: "4rem",
          marginRight: "1rem",
          borderRadius: "unset",
        }}
        className="accountAvtContainer"
      >
        <div
          style={{
            width: "4rem",
            height: "4rem",
          }}
        ></div>
      </div>
      <div>
        <div className="d-flex align-items-center">
          <p className="name ">{user.first_name + " " + user.last_name}</p>
          <p className="time"> Oct 22 38:55pm</p>
        </div>
        <div className="">
          {" "}
          <p className="content">
            Tach cụ rồi Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur doloribu Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Dolore, natus ullam dolor ea totam, mollitia sit,
            officia reprehenderit hic at
          </p>
        </div>
      </div>
    </div>
  );
}
