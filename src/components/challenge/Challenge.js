import { UserContext } from "../../context/UserProvider";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState ,} from "react";
import { ReactQuillNoSSR } from "../form/NoSSR";
import OutsideClickDetect from "../form/OutsideClickDetect";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdTrash ,IoMdPause} from "react-icons/io";
import { AiFillEdit,AiFillDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { GoTriangleUp,GoTriangleDown } from "react-icons/go";
import axios from "axios";
import Help from "../../service/Help";
import { authorization } from "../../service/authorization";
const formats = [
  "header","font","size","bold", "italic","underline","strike", "blockquote","list","bullet", "indent","link","image"
];

const SmallMenu = () => {
    const [open, setOpen] = useState(false);

    return (<>
        
    </>)
}

export default function Challlenge() {
  const { user } = useContext(UserContext);
  const quillRef =useRef();
  const [target, setTarget] = useState("");
  const [content, setContent] = useState("");
  const [time_start,setTimeStart] = useState("00:00");
  const [date_start,setDateStart] = useState();
  const [time_end,setTimeEnd] = useState("00:00");
  const [date_end,setDateEnd] = useState();
  const [advantage,setAdvantage] = useState("");
  const [difficult,setDifficult] = useState("");
  const [strength,setStrength] = useState("");
  const [defect,setDefect] = useState("");
  const [advantages,setAdvantages] = useState([]);
  const [difficults,setDifficults] = useState([]);
  const [strengths,setStrengths] = useState([]);
  const [defects,setDefects] = useState([]);
  const [easy,setEasy] = useState(false);
  const [normal,setNormal] = useState(false);
  const [hard,setHard] = useState(false);
  const [very_hard,setVeryHard] = useState(false);
  const [open,setOpen] = useState({
    "advantage":false,
    "difficult":false,
    "strength":false,
    "defect":false,
    "reward":false,
    "penalty":false
  });

  const submit =async ()=>{
    const status = easy?1:normal?2:hard?3:very_hard?4:0;
    const start = Help.getUnixNum(new Date(Help.getDateInputFormat(date_start)+`T${time_start}`));
    const end = Help.getUnixNum(new Date(Help.getDateInputFormat(date_end)+`T${time_end}`))
    const data ={
      target:target,
      content:content,
      advantages:advantages,
      difficults:difficults,
      strengths:strengths,
      defects:defects,
      status:status,
      start:start,
      end:end
    }
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/user/challenge/create`,data,authorization());
      
    }catch(err){
      console.log(err);
    }
    console.log(data);
  }
  const hanldeLevel = (name)=>{
    switch (name){
      case "easy":
        if(!easy){
          setEasy(!easy);setNormal(false);setHard(false);setVeryHard(false);
        }
        break;
      case "normal":
        if(!normal){
          setEasy(false);setNormal(!normal);setHard(false);setVeryHard(false);
        }
        break;
      case "hard":
        if(!hard){
          setEasy(false);setNormal(false);setHard(!hard);setVeryHard(false);
        }
        break;
      case "very_hard":
        if(!very_hard){
          setEasy(false);setNormal(false);setHard(false);setVeryHard(!very_hard);
        }
        break;
     }
 }

  const hanldeOpen = (name)=>{
    switch (name){
      case "advantage":
        setOpen({...open,"advantage":!open[name]});
        break;
      case "difficult":
        setOpen({...open,"difficult":!open[name]});
        break;
      case "strength":
        setOpen({...open,"strength":!open[name]});
        break;
      case "defect":
        setOpen({...open,"defect":!open[name]});
        break;
     }
 }
  const hanldeStatus = (status,value)=>{
    console.log(status,value);
     switch (status){
      case "advantage":
        setAdvantages([...advantages,value]);
        break;
      case "difficult":
        setDifficults([...difficults,value]);
        break;
      case "strength":
        setStrengths([...strengths,value]);
        break;
      case "defect":
        setDefects([...defects,value]);
        break;
     }
  }

  const hanldeDelete = (status,index)=>{
    switch (status){
     case "advantage":
       setAdvantages([...advantages.slice(0,index),...advantages.slice(index+1)]);
       break;
     case "difficult":
       setDifficults([...difficults.slice(0,index),...difficults.slice(index+1)]);
       break;
     case "strength":
       setStrengths([...strengths.slice(0,index),...strengths.slice(index+1)]);
       break;
     case "defect":
       setDefects([...defects.slice(0,index),...defects.slice(index+1)]);
       break;
    }
 }
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
          ["link", "image"],
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
  const handleColor = ()=>{
    if(easy)return "bg-green-400";
    if(normal)return "bg-blue-400";
    if(hard)return "bg-red-200";
    if(very_hard)return "bg-red-400";
  }

  const onChangeTime = (e,status) => {
    console.log(e.target.value);
    status?setTimeStart(e.target.value)
        :setTimeEnd(e.target.value);
};

const onChangeDate = (e,status) => {
  console.log(e.target.value);
  status ? setDateStart(Help.getUnixNum(e.target.value))
       :setDateEnd(Help.getUnixNum(e.target.value));
};

  return (  
    <div>
     <div className={`${handleColor()} ml-10 mb-5 inline-block shadow hover:shadow-md  transition-all cursor-pointer rounded-md px-3 py-2  mt-5 `}>
       <div className="ml-2 text-base font-medium text-gray-600 mb-1.5 block">Tạo cuộc chơi</div>
       <div>
          <div>
            <label className="ml-2 text-base font-medium text-gray-600 mb-1.5 block">Mục tiêu</label>
            <input onChange={(e)=>{setTarget(e.target.value)}} type="text" placeholder="Mục tiêu..." className="  focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-gray-100 focus:border-green-800 transition-all"/>
          </div>
       </div>
       <div>
       <div className="ml-2 text-base font-medium text-gray-600 mb-1.5 block">Mô tả</div>
          <ReactQuillNoSSR
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            forwardedRef={quillRef}
            onChange={setContent}
          />
       </div>

    <div className={` mt-2  outline-none focus:outline-none  rounded-lg bg-gray-100  border-4 border-transparent focus:border-primary transition-all`}>
    <label className="ml-2 text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Thời gian</label> 
      <div className=" flex w-full justify-between outline-none px-2 focus:outline-none rounded-lg bg-gray-100 border-transparent focus:border-primary transition-all">
          <div className="outline-none focus:outline-none px-2 py-1 rounded-lg bg-pink-300  border-4 border-transparent focus:border-primary transition-all">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Bắt đầu</label>
                  <div className="mt-2 flex ">
                      <div className="flex-2">
                          <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Ngày</label>
                              <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                                  type="date"
                                  name="since"
                                  placeholder={"date"}
                                  onChange={(e)=>{onChangeDate(e,1)}}
                                  value={Help.getDateInputFormat(date_start)}
                              />
                          </div>
                          <div className="flex-2 ml-5">
                              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Giờ</label>
                                  <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                                      type="time"
                                      name="since"
                                      placeholder={"time"}
                                      onChange={(e)=>{onChangeTime(e,1)}}
                                      value={time_start}
                                  />
                          </div>
                  </div>
          </div>
        
        <div className=" outline-none focus:outline-none px-2 py-1 rounded-lg bg-purple-300  ml-2 border-4 border-transparent focus:border-primary transition-all">
            <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Kết thúc</label>
                <div className="mt-2 flex ">
                    <div className="flex-2">
                        <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Ngày</label>
                            <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                                type="date"
                                name="since"
                                placeholder={"date"}
                                onChange={(e)=>{onChangeDate(e,0)}}
                                value={Help.getDateInputFormat(date_end)}
                            />
                        </div>
                        <div className="flex-2 ml-5">
                            <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Giờ</label>
                                <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                                    type="time"
                                    name="since"
                                    placeholder={"time"}
                                    onChange={(e)=>{onChangeTime(e,0)}}
                                    value={time_end}
                                />
                        </div>
                </div>
          </div>
       </div>
      </div>


      <div className="mt-2  outline-none focus:outline-none  rounded-lg bg-gray-100  border-4 border-transparent focus:border-primary transition-all">
      <label className="ml-2 text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Đánh giá năng lực</label>
       <div className=" flex w-full justify-between outline-none focus:outline-none px-2 ">
          <div className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-pink-300  border-4 border-transparent focus:border-primary transition-all">
             <div className="flex">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Ưu điểm</label>
              {
                open.strength?<GoTriangleUp className="ml-2 mt-1" onClick={()=>{hanldeOpen("strength")}}/>
                :<GoTriangleDown className="ml-2 mt-1" onClick={()=>{hanldeOpen("strength")}}/>
              }
             </div>
                  {
                    open.strength?(
                      <div>
                        {
                          strengths.map((e,index)=>{
                            return (
                              <div key={index} className="flex rounded-lg  text-base font-medium text-gray-600 px-2 bg-pink-200 mb-1.5 block">
                               <div> {index+1}- {e}</div>
                               <AiFillDelete className="ml-2 mt-1" onClick={()=>{hanldeDelete("strength",index)}}/>
                              </div>
                            )
                          })
                        }
                        <div className="mt-2 flex " >
                          <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                              type="text"
                              name="strength"
                              placeholder="Ưu điểm"
                              onChange={(e)=>setStrength(e.target.value)}
                              value={strength}
                          />
                          <div  className="mt-2" onClick={(e)=>{setStrength(""); hanldeStatus("strength",strength)}}>
                          <BsFillArrowRightCircleFill />
                          </div>
                        </div>
                      </div>
                    ):""
                  }
          </div>
        
        <div className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-purple-300  ml-2 border-4 border-transparent focus:border-primary transition-all">
        <div className="flex">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Nhược điểm</label>
              {
                open.defect?<GoTriangleUp className="ml-2 mt-1" onClick={()=>{hanldeOpen("defect")}}/>
                :<GoTriangleDown className="ml-2 mt-1" onClick={()=>{hanldeOpen("defect")}}/>
              }
             </div>
                  {
                    open.defect?(
                      <div>
                        {
                          defects.map((e,index)=>{
                            return (
                              <div key={index} className="flex rounded-lg  text-base font-medium text-gray-600 px-2 bg-purple-200 mb-1.5 block">
                               <div> {index+1}- {e}</div>
                               <AiFillDelete className="ml-2 mt-1" onClick={()=>{hanldeDelete("defect",index)}}/>
                              </div>
                            )
                          })
                        }
                        <div className="mt-2 flex " >
                          <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                              type="text"
                              name="defect"
                              placeholder="Nhược điểm"
                              onChange={(e)=>setDefect(e.target.value)}
                              value={defect}
                          />
                          <div  className="mt-2" onClick={(e)=>{setDefect(""); hanldeStatus("defect",defect)}}>
                          <BsFillArrowRightCircleFill />
                          </div>
                        </div>
                      </div>
                    ):""
                  }
          </div>
       </div>
       </div>

       <div className="mt-2  outline-none focus:outline-none  rounded-lg bg-gray-100  border-4 border-transparent focus:border-primary transition-all">
      <label className="ml-2 text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Đánh giá hoàn cảnh</label>
      <div className=" flex w-full justify-between outline-none focus:outline-none px-2 ">
          <div className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-pink-300  border-4 border-transparent focus:border-primary transition-all">
             <div className="flex">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Thuận lợi</label>
              {
                open.advantage?<GoTriangleUp className="ml-2 mt-1" onClick={()=>{hanldeOpen("advantage")}}/>
                :<GoTriangleDown className="ml-2 mt-1" onClick={()=>{hanldeOpen("advantage")}}/>
              }
             </div>
                  {
                    open.advantage?(
                      <div>
                        {
                          advantages.map((e,index)=>{
                            return (
                              <div key={index} className="flex rounded-lg  text-base font-medium text-gray-600 px-2 bg-pink-200 mb-1.5 block">
                               <div> {index+1}- {e}</div>
                               <AiFillDelete className="ml-2 mt-1" onClick={()=>{hanldeDelete("advantage",index)}}/>
                              </div>
                            )
                          })
                        }
                        <div className="mt-2 flex " >
                          <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                              type="text"
                              name="advantage"
                              placeholder="Ưu điểm"
                              onChange={(e)=>setAdvantage(e.target.value)}
                              value={advantage}
                          />
                          <div  className="mt-2" onClick={(e)=>{setAdvantage(""); hanldeStatus("advantage",advantage)}}>
                          <BsFillArrowRightCircleFill />
                          </div>
                        </div>
                      </div>
                    ):""
                  }
          </div>
        
        <div className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-purple-300  ml-2 border-4 border-transparent focus:border-primary transition-all">
        <div className="flex">
              <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Khó khăn</label>
              {
                open.difficult?<GoTriangleUp className="ml-2 mt-1" onClick={()=>{hanldeOpen("difficult")}}/>
                :<GoTriangleDown className="ml-2 mt-1" onClick={()=>{hanldeOpen("difficult")}}/>
              }
             </div>
                  {
                    open.difficult?(
                      <div>
                        {
                          difficults.map((e,index)=>{
                            return (
                              <div key={index} className="flex rounded-lg  text-base font-medium text-gray-600 px-2 bg-purple-200 mb-1.5 block">
                               <div> {index+1}- {e}</div>
                               <AiFillDelete className="ml-2 mt-1" onClick={()=>{hanldeDelete("difficult",index)}}/>
                              </div>
                            )
                          })
                        }
                        <div className="mt-2 flex " >
                          <input className="w-full outline-none focus:outline-none px-2 py-1 rounded-lg bg-gray-50 mr-3 border-2 border-transparent focus:border-primary transition-all"
                              type="text"
                              name="difficult"
                              placeholder="Nhược điểm"
                              onChange={(e)=>setDifficult(e.target.value)}
                              value={difficult}
                          />
                          <div  className="mt-2" onClick={(e)=>{setDifficult(""); hanldeStatus("difficult",difficult)}}>
                          <BsFillArrowRightCircleFill />
                          </div>
                        </div>
                      </div>
                    ):""
                  }
          </div>
       </div>
    </div>
    
    <div className="w-full semi-lg:w-1/2 ">
                <div className="mt-0">
                    <label className="text-base font-medium text-gray-600 mb-1.5 block" htmlFor="">Đánh giá độ khó</label>
                    <div className="w-full flex flex-wrap">
                        <div  className="flex items-center mr-2 mb-2">
                            <div className="relative mr-2 border-2 border-primary rounded-md px-0.5 py-0.5">
                                <input onClick={()=>hanldeLevel("easy")}
                                    className="absolute h-6 w-6 left-0 opacity-0 cursor-pointer top-0 nextOnChecked:text-primary" type="checkbox" name="level" />
                                 <span className={`${!easy&& "text-transparent"} text-sm transition-all`}>
                                 <FaCheck />
                                </span>
                            </div>
                            <label  className="font-medium text-gray-600">Dễ</label>
                        </div>
                        <div  className="flex items-center mr-2 mb-2">
                            <div className="relative mr-2 border-2 border-primary rounded-md px-0.5 py-0.5">
                                <input onClick={()=>hanldeLevel("normal")}
                                    className="absolute h-6 w-6 left-0 opacity-0 cursor-pointer top-0 nextOnChecked:text-primary" type="checkbox" name="level" />
                                <span className={`${!normal&& "text-transparent"} text-sm transition-all`}>
                                    <FaCheck />
                                </span>
                            </div>
                            <label  className="font-medium text-gray-600">Trung bình</label>
                        </div>
                        <div  className="flex items-center mr-2 mb-2">
                            <div className="relative mr-2 border-2 border-primary rounded-md px-0.5 py-0.5">
                                <input onClick={()=>hanldeLevel("hard")}
                                    className="absolute h-6 w-6 left-0 opacity-0 cursor-pointer top-0 nextOnChecked:text-primary" type="checkbox" name="level" />
                                <span className={`${!hard&& "text-transparent"} text-sm transition-all`}>
                                    <FaCheck />
                                </span>
                            </div>
                            <label  className="font-medium text-gray-600">Khó</label>
                        </div>
                        <div  className="flex items-center mr-2 mb-2">
                            <div className="relative mr-2 border-2 border-primary rounded-md px-0.5 py-0.5">
                                <input 
                                    onClick={()=>hanldeLevel("very_hard")}
                                    className="absolute h-6 w-6 left-0 opacity-0 cursor-pointer top-0 nextOnChecked:text-primary" type="checkbox" name="level" />
                               <span className={`${!very_hard&& "text-transparent"} text-sm transition-all`}>
                                    <FaCheck />
                                </span>
                            </div>
                            <label  className="font-medium text-gray-600">Rất khó</label>
                        </div>
                    </div>
              </div>
        </div>
        <button
            onClick={submit}
            className="outline-none w-36 focus:outline-none bg-primary text-white flex mb-6 items-center justify-center py-1 rounded font-medium  shadow hover:bg-primary-dark transition-all">
             <span>Submit</span>
        </button>
  </div>
   </div>
  );
}

 