import { memo } from "react";
import Contrast from "../../../Contrast";

const BoardXO = ({data})=>{
    function sendAction(x, y) {
      const play = {
        coordinateX: x,
        coordinateY: y,
        type: data.type,
        match_id: data.match_id,
        status:Contrast.PLAY
      };
      data.stompClient.send( `/app/xo/${Contrast.ID_GAMEXO}/${data.match_id}`, {}, JSON.stringify(play) );
      
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
                    if(data.status===Contrast.PLAY)
                    sendAction(index,index1) }}
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
