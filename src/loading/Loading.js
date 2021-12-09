import React from "react";
import Loader from "react-loader-spinner";
export default function Loading({
  height = 100,
  width = 100,
  heightContainer = "100vh",
}) {
  return (
    <div
      style={{ height: heightContainer, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      className="grid"
    >
      <Loader type="TailSpin" color="#00BFFF" height={height} width={width} />
    </div>
  );
}
