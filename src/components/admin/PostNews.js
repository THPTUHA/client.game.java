import React, { useRef, useState } from "react";
import NavBar from "../navbar/NavBar";
import ReactQuill from "react-quill";
import axios from "axios";
import { authorization } from "../../service/authorization";
import "react-quill/dist/quill.snow.css";


let editorRef = null;

const saveToServer = async(file)=>{
  const formData = new FormData();
  formData.append("image", file);
  try{
    const res = await axios.post(`${process.env.REACT_APP_SERVER}/admin/news/image`,formData);
    console.log(res.data);
    editorRef.getEditor().insertEmbed(null, "image", res.data);
    console.log(editorRef);
  }catch(err){
    console.log(err);
  }
}
const imageHandler = (e) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
          saveToServer(file);
      } else {
          console.warn("You could only upload images.");
      }
  };
};

const modules = {
  toolbar: {
    container:[
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    handlers: {  
     image: imageHandler  
    }
  }, 
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
export default function PostNews() {
  const [content, setContent] = useState();
  const [status, setStatus] = useState("");
  const title = useRef();
  const describes = useRef();
  const background_image = useRef();

  const submit = async () => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("title", title.current);
    formData.append("describes", describes.current);
    formData.append("background_image", background_image.current);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/admin/news/create`,
        formData,
        authorization()
      );
      setStatus(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <NavBar />
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div className="grid pt-5">
              <div>
                <p>{status}</p>
                <div> Tiêu đề:</div>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    title.current = e.target.value;
                  }}
                  required
                />
                <div> Mô tả:</div>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    describes.current = e.target.value;
                  }}
                  required
                />
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={(e) => {
                    background_image.current = e.target.files[0];
                  }}
                  required
                />{" "}
                <br />
                <div>
                  <div> Nội dung:</div>
                  <div>
                    <ReactQuill
                      ref={(e)=>{editorRef=e}}
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      value={content}
                      forwardedRef={editorRef}
                      onChange={setContent}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={submit}
                >
                  Đăng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
