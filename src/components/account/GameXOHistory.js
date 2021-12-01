import React from "react";

const handleTime = (e)=>{
  let date = new Date(e*1000);
  return date.getHours()+":"+date.getMinutes()+" "+date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
}
export default function GameXOHistory({ match,index }) {
  return (
    <div className="gameHistory container-fluid p-0">
      <div className="row p-0 pt-1">
        <div className="col-1">
          <div className="h-100 grid">
            <div>{match.game_name}</div>
          </div>
        </div>
        <div className="col-1">
          <div className="h-100 grid">
            <div>{handleTime(match.start_time)}</div>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex align-items-center justify-content-end h-100">
            <span className="name">
              {match.player_1.name}
            </span>

            <div
              style={{
                backgroundImage: `url(${match.player_1.avatar}`,
                width: 30,
                height: 30,
                border: "1px solid whitesmoke",
              }}
              className="accountAvtContainer"
            ></div>
          </div>
        </div>
        <div className="col-3 ">
          <div style={{ height: "100%" }} className="grid">
            <div className="grid">
              <div className="res">
                <div className="d-flex">
                  <div></div>
                  <div style={{ fontWeight: 500, fontSize: "0.8rem" }}>
                    {match.player_1.point} - {match.player_2.point}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex align-items-center justify-content-start h-100">
            <div
              style={{
                backgroundImage: `url(${match.player_2.avatar}`,
                width: 30,
                height: 30,
              }}
              className="accountAvtContainer"
            ></div>

            <span className="name">
              {match.player_2.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
