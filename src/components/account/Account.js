import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserProvider";
import NavBar from "../navbar/NavBar";
import { Link } from "react-router-dom";
import FormData from "form-data";
import { authorization } from "../../service/authorization";
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { FiEdit } from "react-icons/fi";
import GameHistory from "./GameXOHistory";
const images =[];
export default function Account() {
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState(user.avatar);
  const [new_avatar, setNewAvatar] = useState();
  const [gameplay_history, setGamePlayHistory] = useState();
  const [images,setImages]= useState([]);

  useEffect(async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/gameplay/history`,
        {},
        authorization()
      );
      console.log(res.data);
      setGamePlayHistory(res.data);
    } catch (err) {}
  }, []);

  const submit = async () => {
    console.log(new_avatar[0]);
    const formData = new FormData();
    formData.append("new_avatar", new_avatar[0]);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/update_avatar`,
        formData,
        authorization()
      );
      setAvatar(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onImageSelectChange = (
    imageList
) => {
  console.log(imageList);
    // setImages(imageList);
};

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row pt-3 pb-3">
          <div className="col-sm-4">
            <div className="position-relative">
              <div className="info d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center">
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
                    <div 
                      style={{ backgroundImage: `url(${avatar}` }}
                      className="accountAvtContainer"
                      onClick={() => onImageUpdate()}>
                    </div>
                )}
            </ImageUploading>
                </div>
            
                <p className="name">{user.first_name + " " + user.last_name}</p>
                <p className="content">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="content">
                  <strong>Giới tính:</strong> {user.sex === 1 ? "Nam" : "Nữ"}
                </p>
                <p className="content">
                  <strong>Gold:</strong> {user.gold}
                </p>
                <p className="content">
                  <strong>Exp:</strong> {user.exp}
                </p>
                <p className="content">
                  <strong>Status:</strong> {user.status}
                </p>
                <Link to="/account/edit">
                  <button type="button" className="btn btn-primary">
                    {" "}
                    Cập nhật thông tin
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="row">
              <strong>Lịch sử đấu</strong>
            </div>
            {gameplay_history
              ? gameplay_history.map((e, index) => {
                  return e.map((match, id) => {
                    return <GameHistory key={id} index={index} match={match} />;
                  });
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
