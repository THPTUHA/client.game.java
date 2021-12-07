import React from "react";
import NavBar from "../navbar/NavBar";
import { Link } from "react-router-dom";
import Challlenge from "../challenge/Challenge";
export default function Admin() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="mb-2">
              <Link to="/admin/user">Quản lý người dùng</Link>
            </div>
            <Link to="/admin/news">Quản lý news</Link>
          </div>
        </div>
      </div>
      <Challlenge />
    </div>
  );
}
