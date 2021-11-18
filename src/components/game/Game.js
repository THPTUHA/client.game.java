import { Route, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import GameXO from "./xo/GameXO";
import { UserContext } from "../../context/UserProvider";
import { useContext } from "react";
import NavBar from "../navbar/NavBar";
import { Switch } from "react-router";
import ChatBox from "../chat/ChatBox";
function Game() {
  const match = useRouteMatch();
  const { user } = useContext(UserContext);
  return (
    <>
      <Switch>
        <Route
          path={`${match.url}/xo`}
          component={() => <GameXO user={user} />}
        />
        <Route path="/gameplay">
          <NavBar />

          <div className="container-fluid game">
            <div class="row">
              <div class="col-sm-6">
                <h1>Game </h1>
                <Link to={`${match.url}/xo`}>Cờ Caro</Link>
              </div>
              <div class="col-lg-6 mt-5">
                <ChatBox
                  data={{
                    stompClient: 1,
                    type: 1,
                    id_match: 1,
                    winner: 1,
                    messages: [],
                  }}
                />
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default Game;
