import { Redirect } from "react-router";
import Contrast from "../../../Contrast";
import CountDown from "../../util/CountDown";

const Player = ({ player, match_id, stompClient, you, turn ,time,url}) => {
  const handleCancelMatch = () => {
    localStorage.removeItem("answers");
    try {
      const req = {
        match_id: match_id,
        status: Contrast.CANCEL_GAME,
        type: player.type,
      };
      stompClient.send(
       url,
        {},
        JSON.stringify(req)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const ready = () => {
    try {
      const req = {
        match_id: match_id,
        status: Contrast.READY,
        type: player.type,
      };
      stompClient.send(
       url,
        {},
        JSON.stringify(req)
      );
    } catch (err) {
      console.log(err);
    }
  };

  function playAgain() {
    localStorage.removeItem("answers");
    try {
      const req = {
        match_id: match_id,
        status: Contrast.PLAY_AGAIN,
        type: player.type,
      };
      stompClient.send(
        url,
        {},
        JSON.stringify(req)
      );
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="d-flex align-items-center mb-1">
        <img
          style={{ width: 40 }}
          src={`https://avatars.dicebear.com/api/micah/${player.name}.svg`}
          alt=""
        />
        <h6
          className={
            player.status === Contrast.PLAY && player.type === turn
              ? "turn"
              : ""
          }
        >
          {player.name} EXP: {player.exp}
        </h6>
        {player.status === Contrast.PLAY && player.type === turn ? (
          <CountDown
            data={{
              time: time,
              type: player.type,
              stompClient: stompClient,
              match_id: match_id,
            }}
          />
        ) : (
          ""
        )}
        {player.status === Contrast.WINNER ? <div>Winner</div> : ""}
        {player.status === Contrast.READY && !you ? (
          <div className="ss">Đã sắn sàng</div>
        ) : (
          ""
        )}
        {player.status === Contrast.CANCEL_GAME && !you ? (
          <div className="text-danger">Đã rời trận</div>
        ) : (
          ""
        )}
        {player.status === Contrast.PLAY_AGAIN && !you ? (
          <div className="ss">Chơi lại nào!!</div>
        ) : (
          ""
        )}
        {player.status === Contrast.CANCEL_GAME && you ? (
          <Redirect to="/gameplay" />
        ) : (
          ""
        )}

        {player.status === Contrast.START_GAME && you ? (
          <button className="btn btn-warning" onClick={ready}>
            Sẵn sàng
          </button>
        ) : (
          ""
        )}
        {player.status === Contrast.END_GAME && you ? (
          <button
            style={{ marginLeft: "1rem" }}
            className="btn btn-success"
            onClick={playAgain}
          >
            Chơi lại
          </button>
        ) : (
          ""
        )}
        {you ? (
          <button
            style={{ marginLeft: "1rem" }}
            className="btn btn-danger"
            onClick={handleCancelMatch}
          >
            Thoát trận
          </button>
        ) : (
          ""
        )}

        <p> Point :{player.point}</p>
        <p> Blood :{player.blood}</p>
        {
            player.status === Contrast.LOSE?(
                <p>FUCK</p>
            ):""
        }
      </div>
    </>
  );
};

export default Player;
