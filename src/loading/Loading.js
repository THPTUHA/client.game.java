import React from "react";
import Loader from "react-loader-spinner";
export default function Loading() {
  return (
    <div
      style={{ height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="grid"
    >
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
}
