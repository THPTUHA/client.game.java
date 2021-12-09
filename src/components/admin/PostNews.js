import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NavBar from "../navbar/NavBar";
import ReactQuill from "react-quill";
import axios from "axios";
import { authorization } from "../../service/authorization";
import "react-quill/dist/quill.snow.css";
import { Toast }  from "../../service/Toast";
import Contrast from "../../Contrast";
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import {ReactQuillNoSSR} from "../form/NoSSR";
import { FiEdit } from "react-icons/fi";


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
  const [content, setContent] = useState("");
  const [images,setImages]= useState([]);
  const quillRef =useRef();
  const [title,setTitle]= useState("");
  const [describes,setDescribes]= useState("");

  const onImageSelectChange = (
    imageList
) => {
    setImages(imageList);
};

  const imageHandler = useCallback(()=>{
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
    
      input.onchange =async () => {
          const file = input.files[0];
          if (/^image\//.test(file.type)) {
            const formData = new FormData();
            formData.append("image", file);
            try{
              const res = await axios.post(`${process.env.REACT_APP_SERVER}/admin/news/image`,formData);
              quillRef.current.getEditor().insertEmbed(null, "image", res.data);
            }catch(err){
              console.log(err);
            }
          } else {
              console.warn("You could only upload images.");
          }
      };
    },[quillRef]);

  const modules = useMemo(()=>(
    {
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
    }
  ));
  const submit = async () => {
    const formData = new FormData();
    if(!title)return Toast.error("Thiếu title");
    if(!describes)return Toast.error("Thiếu mô tả");
    if(!images.length)return Toast.error("Thiếu ảnh nền");
    if(!content)return Toast.error("Thiếu nội dung");
    console.log(images);
    formData.append("content", content);
    formData.append("title", title);
    formData.append("describes", describes);
    formData.append("background_image", images[0].file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/admin/news/create`,
        formData,
        authorization()
      );
      const data = res.data;
      setContent("");
      setTitle("");
      setImages([]);
      setDescribes("");
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
              <div>
                <div> Tiêu đề:</div>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setTitle( e.target.value);
                  }}
                />
                <div> Mô tả:</div>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                   setDescribes(e.target.value);
                  }}
                />
          <div>Ảnh nền</div>
          <ImageUploading
                value={images}
                onChange={onImageSelectChange}
                maxNumber={1}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    isDragging,
                    dragProps,
                }) => (
                    <div className="upload__image-wrapper">
                        <button
                            className={` ${images.length > 0 && "none"} text-base outline-none focus:outline-none outline-none w-20 focus:outline-none bg-primary text-white flex items-center justify-center py-1 rounded font-medium mt-3 shadow `}
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Upload
                        </button>
                        {imageList.map((image, index) => (
                            <div key={index} className="flex">
                                <div
                                    className=" overflow-hidden rounded-md shadow relative">
                                    <img src={`${image['data_url']}`} alt="" />
                                    <div className="absolute flex items-center top-3 right-1">
                                        <span onClick={() => onImageUpdate(index)} className=" cursor-pointer px-1.5 py-1.5 mr-2 bg-white shadow-md text-lg rounded-full transition-all hover:bg-gray-200">
                                            <FiEdit />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
                <div>
                  <div> Nội dung:</div>
                  <div>
                    <ReactQuillNoSSR
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      value={content}
                      forwardedRef={quillRef}
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
