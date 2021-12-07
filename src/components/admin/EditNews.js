import React, { useEffect, useRef, useState } from "react";
import NavBar from "../navbar/NavBar";
import ReactQuill from "react-quill";
import axios from "axios";
import { authorization } from "../../service/authorization";
import "react-quill/dist/quill.snow.css";
import { Toast }  from "../../service/Toast";
import Contrast from "../../Contrast";
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { useParams } from "react-router";

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


export default function EditNews() {
  const { id } = useParams();
  const [content, setContent] = useState();
  const title = useRef();
  const describes = useRef();
  const background_image = useRef();
  const [loading ,setLoading] = useState(false);

  useEffect(async()=>{
    try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER}/news/detail`,
          { id: id },
          authorization()
        );
        const data = res.data;
        setContent(data.content);
        title.current= data.title;
        describes.current = data.describes;
        background_image.current = data.background_image;
        setLoading(true);
      } catch (err) {
        Toast.error("Something worng!!");
      }
  },[]);

  const submit = async () => {
    const formData = new FormData();
    if(!title.current)return Toast.error("Thiếu title");
    if(!describes.current)return Toast.error("Thiếu mô tả");
    if(!background_image.current)return Toast.error("Thiếu ảnh nền");
    if(!content)return Toast.error("Thiếu nội dung");
    formData.append("id", id);
    formData.append("content", content);
    formData.append("title", title.current);
    formData.append("describes", describes.current);
    formData.append("background_image", background_image.current);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/admin/news/update`,
        formData,
        authorization()
      );
      const data = res.data;
      setContent("");
      title.current="";
      describes.current="";
      background_image.current="";
      if(data.status === Contrast.ERROR)Toast.error(data.message);
      else Toast.success(data.message);
    } catch (err) {
      Toast.error("Some thing worng!!");
    }
  };
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="grid pt-5">
              {
                loading?(
                    <div>
                        <div> Tiêu đề:</div>
                        <input
                        className="form-control"
                        type="text"
                        placeholder={title.current}
                        onChange={(e) => {
                            title.current = e.target.value;
                        }}
                        />
                        <div> Mô tả:</div>
                        <input
                        className="form-control"
                        type="text"
                        placeholder={describes.current}
                        onChange={(e) => {
                            describes.current = e.target.value;
                        }}
                        />
                        <input
                        type="file"
                        id="file"
                        name="image"
                        onChange={(e) => {
                            background_image.current = e.target.files[0];
                        }}
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
                        Save
                        </button>
                    </div>
                ):""
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
