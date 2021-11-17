import React from "react";
import News from "../news/News";

export default function RecentNews() {
  return (
    <div className="container">
      <div className="row">
        <div className="blogs pt-5 pb-5">
          <p className="sessionTitle">BÀI VIẾT MỚI</p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <News />
        </div>
        <div className="col-sm-4">
          <News />
        </div>
      </div>
    </div>
  );
}
