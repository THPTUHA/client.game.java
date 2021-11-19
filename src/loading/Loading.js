import React from "react";
import Loader from "react-loader-spinner";
export default function Loading() {
  return (
    <div
      style={{ height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      className="grid"
    >
      <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
    </div>
  );
}
