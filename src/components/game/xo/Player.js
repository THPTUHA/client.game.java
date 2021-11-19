import { Redirect } from "react-router";
import Contrast from "../../../Contrast"
import CountDown from "../../util/CountDown"

const Player = ({player ,id_match, stompClient ,you  , turn})=>{

    const handleCancelMatch = () => {
        try {
          const req = {
            id_match: id_match,
            status: Contrast.CANCEL_GAME,
            type: player.type,
          };
          stompClient.send(
            `/app/xo/${Contrast.ID_GAMEXO}/${id_match}`,
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
            id_match: id_match,
            status: Contrast.READY,
            type: player.type,
            };
            stompClient.send(
             `/app/xo/${Contrast.ID_GAMEXO}/${id_match}`,
            {},
            JSON.stringify(req)
            );
        } catch (err) {
            console.log(err);
        }
    };

    function playAgain() {
      try {
        const req = {
          id_match: id_match,
          status: Contrast.PLAY_AGAIN,
          type: player.type,
        };
        stompClient.send(
          `/app/xo/${Contrast.ID_GAMEXO}/${id_match}`,
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
                  <h6>
                    {player.name} EXP:{" "} {player.exp}
                  </h6>
                  {player.status === Contrast.PLAY && player.type === turn  ? (
                    <CountDown
                      data={{
                        time: 2,
                        type: player.type,
                        stompClient: stompClient,
                        id_match: id_match
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {
                      player.status === Contrast.WINNER ?(
                          <div>Winner</div>
                      ):""
                  }
                  {
                      player.status === Contrast.READY && !you ?(
                          <div>Đã sắn sàng</div>
                      ):""
                  }
                  {
                      player.status === Contrast.CANCEL_GAME && !you ?(
                          <div>Đã rời trận</div>
                      ):""
                  }
                  {
                      player.status === Contrast.PLAY_AGAIN && !you ?(
                          <div>Chơi lại nào!!</div>
                      ):""
                  }
                  {
                      player.status === Contrast.CANCEL_GAME && you ?(
                          <Redirect to="/gameplay" />
                      ):""
                  }


                  {player.status === Contrast.START_GAME && you ? (
                    <button className="btn btn-warning" onClick={ready}>
                      Sẵn sàng
                    </button>
                  ) : (
                    ""
                  )}
                  {
                    player.status === Contrast.END_GAME && you ?(
                      <button
                        style={{ marginLeft: "1rem" }}
                        className="btn btn-success"
                        onClick={playAgain}
                        >
                            Chơi lại
                        </button>
                    ):""
                  }
                  {
                      you?(
                        <button
                        style={{ marginLeft: "1rem" }}
                        className="btn btn-danger"
                        onClick={handleCancelMatch}
                        >
                            Thoát trận
                        </button>
                      ):""
                  }
                </div>

        </>
    )
}

export default Player;