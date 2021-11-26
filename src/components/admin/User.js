import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../loading/Loading";
import { authorization } from "../../service/authorization";
import NavBar from "../navbar/NavBar";

export default function User() {
  const [user,setUser] = useState();
  const [loading,setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [status,setStatus] = useState();
  const user_change = useRef([]);

  useEffect(async()=>{
    setLoading(true);
    try{
       const res = await axios.get(`${process.env.REACT_APP_SERVER}/admin/list_user`,{},authorization());
       console.log(res.data);
       setUser(res.data);
    }catch(err){
    }
    setLoading(false);
  },[]);

  const submit = async()=>{
    setReload(true);
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/admin/list_user/update`
                        ,user_change.current,authorization());
      setStatus(res.data);
   }catch(err){
   }
   setReload(false);
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
    console.log(user_change.current);
    setUser(temp);
  }

  return (
    !loading?(
      <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
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
                          <td>1</td>
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
            <button type="button" className="btn btn-primary" onClick={submit}>
              Lưu
            </button>
            {
              reload?(<i className="fad fa-spinner-third"></i>):status
            }
          </div>
        </div>
      </div>
    </div>
    ):<Loading></Loading>
  );
}
