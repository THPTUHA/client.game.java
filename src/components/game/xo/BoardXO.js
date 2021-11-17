import { memo } from "react";

const id_game = 1;
const BoardXO = ({data})=>{
    function sendAction(x, y) {
      console.log("send to:", data.id_match);
      const play = {
        coordinateX: x,
        coordinateY: y,
        type: data.type,
        id_match: data.id_match,
      };
      data.stompClient.send( `/app/xo/${id_game}/${data.id_match}`, {}, JSON.stringify(play) );
      
    }

     return data.board.map((row, index) => {
        return (
          <div style={{ height: "8rem" }} key={index}>
            {row.map((ele, index1) => {
              return ele === 1 ? (
                <div className="o" key={index1}>
                  <p>X</p>
                </div>
              ) : ele === 2 ? (
                <div className="o" key={index1}>
                  <p>O</p>
                </div>
              ) : (
                <div
                  className="o"
                  onClick={() => {
                    if(!data.winner)sendAction(index,index1) }}
                  key={index1}
                >
                  <p> </p>
                </div>
              );
            })}
          </div>
        );
      });
}

export default memo(BoardXO);
