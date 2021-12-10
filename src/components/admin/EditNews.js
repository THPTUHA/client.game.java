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
import { useParams } from "react-router";


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
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [images,setImages]= useState([]);
  const [imagex,setImagex]= useState([]);
  const quillRef =useRef();
  const [title,setTitle]= useState("");
  const [describes,setDescribes]= useState("");
  const [loading ,setLoading] = useState(false);

  useEffect(async()=>{
    try {
       if(id){
          const res = await axios.post(
            `${process.env.REACT_APP_SERVER}/news/detail`,
            { id: id },
            authorization()
          );
          const data = res.data;
          setContent(data.content);
          setDescribes(data.describes);
          setTitle(data.title);
          setImagex([data.background_image]);
          setLoading(true);
       }
      } catch (err) {
        Toast.error("Something worng!!");
      }
  },[id]);

  const onImageSelectChange = (
    imageList
) => {
  console.log(imageList);
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
          [{'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color']}]
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
    formData.append("content", content);
    formData.append("title", title);
    formData.append("describes", describes);
    formData.append("background_image", images[0].file);
    formData.append("id", id);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/admin/news/update`,
        formData,
        authorization()
      );
      const data = res.data;
      setContent("");
      setTitle("");
      setImages([]);
      setImagex([]);
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
                  value={title}
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setTitle( e.target.value);
                  }}
                />
                <div> Mô tả:</div>
                <input
                  value={describes}
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
                            {imagex ? <>
                                  <img src={`${imagex[0]}`} alt="" />
                              </> : "Upload"}
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
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
