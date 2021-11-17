import { Route, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import GameXO from "./xo/GameXO";
import { UserContext } from "../../context/UserProvider";
import { useContext } from "react";
import NavBar from "../navbar/NavBar";

function Game() {
  const match = useRouteMatch();
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <div className="container-fluid game">
        <h1>Game </h1>
        <Link to={`${match.url}/xo`}>Cờ Caro</Link>
        <Route
          path={`${match.url}/xo`}
          component={() => <GameXO user={user} />}
        />
      </div>
    </>
  );
}

export default Game;
