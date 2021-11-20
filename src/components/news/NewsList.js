import React from "react";
import NavBar from "../navbar/NavBar";
import News from "./News";
import SmallNewsBox from "./SmallNewsBox";

export default function ListNews() {
  return (
    <>
      <NavBar />
      <div className="container-fluid ">
        <div className="row pt-5">
          <div className="col-8 padding-0">
            <div className="container">
              <div className="row">
                <News />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="container-fluid smallBlogs padding-0">
              <div className="row">
                <div className="col-sm-12">
                
                  <p className="sessionTitle">BÀI VIẾT NỔI BẬT</p>
                </div>
              </div>
            </div>
            <div className="smallBlog blog container-fluid padding-0">
              <div className="row">
                <SmallNewsBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
