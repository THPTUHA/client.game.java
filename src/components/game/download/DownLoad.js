import React from "react";
import NavBar from "../../navbar/NavBar";
import game from "../../../assets/2048.zip";
export default function DownLoad() {
  function importAll(r) {
    return r.keys().map(r);
  }
  const images = importAll(
    require.context("../../../assets/img/games", false, /\.(png|jpe?g|svg)$/)
  );
  console.log(images);
  return (
    <div>
      <NavBar />
      <div className="container-fluid download pb-4 pt-4">
        <div className="row">
          {images.map((item) => (
            <a className="col-3 col-sm-1" href={game} download>
              <img className="w-100 " src={item.default} alt="" srcset="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
