import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../loading/Loading";
import { authorization } from "../../service/authorization";
import NavBar from "../navbar/NavBar";
import Help from "../../service/Help";
import { Toast }  from "../../service/Toast";

const hanldePage = (size)=>{
   const page = [];
   let i=1;
   while(size>0){
     page.push(i);
    size -=5;
     i++;
   }
   return page;
}
export default function User() {
  const [user,setUser] = useState();
  const [page,setPage] = useState([]);
  const [loading,setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [pos,setPos] = useState(0);
  const user_change = useRef([]);
  const [selection, setSelection] =useState("NEWEST");

  useEffect(async()=>{
    setLoading(true);
    const formData = new FormData();
    formData.append("pos", pos);
    formData.append("selection", selection);
    try{
       const res = await axios.post(`${process.env.REACT_APP_SERVER}/admin/list_user`,formData,authorization());
       console.log(res.data);
       setUser(res.data.users);
       setPage(hanldePage(res.data.page_size));
    }catch(err){
      Toast.error("Something wrong!!");
    }
    setLoading(false);
  },[pos,selection]);


  const submit = async()=>{
    setReload(true);
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/admin/list_user/update`
                        ,user_change.current,authorization());
      Toast.success("Thay đổi thành công!!");
      setReload(false);
   }catch(err){
      Toast.error("Something wrong!!");
      setReload(false);
   }
  }

  const handleUser = (name,value,index)=>{
    const temp = [...user];
    temp[index][name] = value;
    let exit = false;
    for(let i=0;i< user_change.current.length;++i){
      {
        if(user_change.current[i].id === temp[index].id )
        {
           exit = true;
           user_change.current[i] = temp[index];
           break;
        }
      }
    }
    if(!exit)user_change.current.push(temp[index]);
    setUser(temp);
  }

  return (
    !loading?(
      <div>
      <NavBar />
      <div className="container mt-10">
        <div className="row">
          <div className="col-sm-12">
            <div>
              <select name="select" value={selection} onChange={(e)=>{setSelection(e.target.value);setPos(0)}}>
                <option value="NEWSEST">NEWEST</option>
                <option value="ROLE_ADMIN">ADMIN</option>
                <option value="ROLE_USER">USER</option>
                <option value="ROLE_VIP">VIP</option>
                <option value="ROLE_GUEST">GUEST</option>
              </select>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Đăng nhập gần nhất</th>
                  <th>Chức vụ</th>
                  <th>Khóa</th>
                </tr>
              </thead>
              <tbody>
                {
                  user?user.map((e,index)=>{
                      return (
                        <tr key={index}>
                        <td scope="row">{e.first_name+" "+e.last_name}</td>
                          <td scope="row">{e.email}</td>
                          <td>{Help.getDay(e.last_login)}</td>
                          <td>
                            <select name="role" value={e.role} onChange={(e)=>{handleUser(e.target.name,e.target.value,index)}}>
                              <option value="ROLE_ADMIN">ADMIN</option>
                              <option value="ROLE_USER">USER</option>
                              <option value="ROLE_VIP">VIP</option>
                              <option value="ROLE_GUEST">GUEST</option>
                            </select>
                          </td>
                          <td>
                            <input type="checkbox" name="locked" checked={!e.locked} onChange={(e)=>{handleUser(e.target.name,!e.target.checked,index)}}/>
                          </td>
                      </tr>
                      )
                    }):""
                }
              </tbody>
            </table>
          </div>
          <div className="col-sm-12">
          {
            page.map((e,index)=>{
              return <span onClick={()=>{setPos(e-1)}}>{e}</span>
            })
          }
            <button type="button" className="btn btn-primary" onClick={submit}>
              Lưu
            </button>
            {
              reload?(<i className="fad fa-spinner-third"></i>):""
            }
          </div>
        </div>
      </div>
    </div>
    ):<Loading></Loading>
  );
}
