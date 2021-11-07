import React from "react";
import News from "../news/News";

export default function RecentNews() {
  return (
    <div class="container">
      <div class="row">
        <div class="blogs pt-5 pb-5">
          <p class="sessionTitle">BÀI VIẾT MỚI</p>
        </div>
      </div>
      <div className="row">
        <div class="col-sm-4">
          <News />
        </div>
        <div class="col-sm-4">
          <News />
        </div>
      </div>
    </div>
  );
}
