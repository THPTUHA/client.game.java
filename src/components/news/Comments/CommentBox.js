import React, { useContext } from "react";
import { UserContext } from "../../../context/UserProvider";
import Comment from "./Comment";

export default function CommentBox() {
  const { user } = useContext(UserContext);

  return (
    <div class="container-fluid pt-5 pb-5 commentBox">
      <div className="row grid">
        <div class="col-12 w-75 ">
          <p className="counter">3 bình luận</p>
        </div>
        <div class="col-12 w-75 ">
          <div className="d-flex align-items-center ">
            <div
              style={{
                backgroundImage: `url(${user.avatar}`,
                width: "4rem",
                height: "4rem",
                marginRight: "1rem",
                borderRadius: "unset",
              }}
              className="accountAvtContainer"
            ></div>
            <input
              type="text"
              class="form-control m-0 h-100  "
              name=""
              id=""
              aria-describedby="helpId"
              placeholder="Thêm bình luận..."
            />
          </div>
        </div>
        <div class="col-12 w-75 ">
          <Comment user={user} />
          <Comment user={user} />
          <Comment user={user} />
        </div>
      </div>
    </div>
  );
}
