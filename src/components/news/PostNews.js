import React from "react";
import NavBar from "../navbar/NavBar";

export default function PostNews() {
  return (
    <div>
      <NavBar />

      <div className="grid pt-5">
        <form class="form-group" enctype="multipart/form-data">
          <label for="tieuDeBaiViet"> Tiêu đề:</label>
          <textarea
            class="form-control"
            name="tieuDeBaiViet"
            id=""
            rows="3"
            required
          ></textarea>
          <label for="moTaBaiViet"> Mô tả:</label>
          <textarea
            class="form-control"
            name="moTaBaiViet"
            id=""
            rows="3"
            required
          ></textarea>
          <label for="noiDung"> Nội dung:</label>
          <textarea
            class="form-control"
            name="noiDung"
            id=""
            rows="3"
            required
          ></textarea>
          <input type="file" id="file" name="file" required /> <br />
          <button className="btn btn-warning" type="submit">
            Đăng
          </button>
        </form>
      </div>
    </div>
  );
}
