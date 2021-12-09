import React from "react";

const handleTime = (e) => {
  let date = new Date(e * 1000);
  return (
    date.getHours() +
    ":" +
    date.getMinutes() +
    " " +
    date.getDay() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear()
  );
};
export default function GameXOHistory({ match, index }) {
  console.log(match);
  let data = [];
  if (match.game_id === 2) {
    data.push(match.player_1);
    data.push(match.player_2);
    data.push(match.player_3);
    data.push(match.player_4);
    data.sort((b, a) => {
      return a.point - b.point;
    });
  }
  return (
    <div className="gameHistory container-fluid p-0">
      <div className="row p-0 pt-1">
        <div className="col-1">
          <div className="h-100 grid">
            <div style={{ fontSize: 10 }}>{match.game_name}</div>
          </div>
        </div>
        <div className="col-1">
          <div className="h-100 grid">
            <div>
              <p className="time">{handleTime(match.start_time)}</p>
            </div>
          </div>
        </div>
        {match.game_id == 1 ? (
          <>
            <div className="col-4 p-0">
              <div className="d-flex align-items-center justify-content-end h-100">
                <span className="name">{match.player_1.name}</span>

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
            <div className="col-2 p-0">
              <div style={{ height: "100%" }} className="grid">
                <div className="grid">
                  <div className="res">
                    <div className="d-flex">
                      <div></div>
                      <div style={{ fontWeight: 500 }}>
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

                <span className="name">{match.player_2.name}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="col-10 grid">
            {data &&
              data.map((player, index) => {
                return (
                  <div key={index} className="rs">
                    <div className="d-flex align-items-center justify-content-between h-100">
                      <div className="d-flex align-items-center justify-content-start h-100">
                        <span
                          style={{ marginRight: "1rem", fontWeight: "600" }}
                        >
                          {index + 1}
                        </span>

                        <div
                          style={{
                            backgroundImage: `url(${player.avatar}`,
                            width: 30,
                            height: 30,
                            marginRight: "3px",
                          }}
                          className="accountAvtContainer"
                        ></div>

                        <span className="name">{player.name}</span>
                      </div>
                      <span>
                        <strong>{player.point}</strong> points
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
