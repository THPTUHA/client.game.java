import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../loading/Loading";
import { authorization } from "../../service/authorization";
import NavBar from "../navbar/NavBar";
import { Toast } from "../../service/Toast";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/news`,
        {},
        authorization()
      );
      setNews(res.data);
    } catch (err) {
      Toast.error("Something wrong!!");
    }
  }, []);

  const deleteNews = async (id, index) => {
    const formData = new FormData();
    formData.append("id", id);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/admin/news/delete`,
        formData,
        authorization()
      );
      Toast.success("Xóa thành công!!");
      setNews([...news.slice(0, index), ...news.slice(index + 1)]);
    } catch (err) {
      Toast.error("Something wrong!!");
    }
  };
  return (
    <div>
      <NavBar />
      <div className="container pt-3">
        <div className="row">
          <div className="col-sm-12">
            <Link to="/admin/news/post">Đăng bài</Link>
          </div>
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Mô tả</th>
                  <th>Người đăng</th>
                  <th>Chỉnh sửa</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {news
                  ? news.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td scope="row">
                            {" "}
                            <Link to={`/news/detail/${e.id}`}>{e.title} </Link>
                          </td>

                          <td>{e.describes}</td>
                          <td>{e.owner.name}</td>
                          <td>
                            <Link to={`/admin/news/edit/${e.id}`}>
                              <button
                                name=""
                                id=""
                                className="btn btn-primary"
                                role="button"
                              >
                                Sửa
                              </button>
                            </Link>
                          </td>
                          <td>
                            <button
                              name=""
                              id=""
                              className="btn btn-danger"
                              role="button"
                              onClick={() => {
                                deleteNews(e.id, index);
                              }}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
