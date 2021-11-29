import React from "react";

export default function GameHistory({ e }) {
  console.log(e);
  return (
    <div className="gameHistory container-fluid p-0">
      <div className="row p-0">
        <div class="col-1">
          <div className="h-100 grid">
            <div>{e.game_name}</div>
          </div>
        </div>
        <div class="col-4">
          <div className="d-flex align-items-center justify-content-end h-100">
            <span className="name">
              {e.you.first_name + " " + e.you.last_name}
            </span>

            <div
              style={{
                backgroundImage: `url(${e.you.avatar}`,
                width: 30,
                height: 30,
                border: "1px solid whitesmoke",
              }}
              className="accountAvtContainer"
            ></div>
          </div>
        </div>
        <div class="col-3 ">
          <div style={{ height: "100%" }} className="grid">
            <div className="grid">
              <div className="res">
                <div className="d-flex">
                  <div></div>
                  <div style={{ fontWeight: 500, fontSize: "0.8rem" }}>
                    {e.you.point} - {e.opponent.point}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div className="d-flex align-items-center justify-content-start h-100">
            <div
              style={{
                backgroundImage: `url(${e.opponent.avatar}`,
                width: 40,
                height: 40,
              }}
              className="accountAvtContainer"
            ></div>

            <span className="name">
              {e.opponent.first_name + " " + e.opponent.last_name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
