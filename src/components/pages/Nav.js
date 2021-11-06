import { Link, Route, Switch } from "react-router-dom";
import React, { useContext } from "react";
import Register from "../authorization/Register";
import Home from "../Home";
import Login from "../authorization/Login";
import { UserContext } from "../../context/UserProvider";
import Logout from "../authorization/Logout";
import Game from "../game/Game";
import GameXO from "../game/xo/GameXO";
import NavBar from "../navbar/NavBar";

export default function Nav() {
  const { user } = useContext(UserContext);
  // console.log(user);
  return (
    <div>
      <NavBar />

      {
        // !user ? (
        //   <>
        //     {/* <div>
        //       <Link to="/login">Login</Link>
        //     </div>
        //     <div>
        //       <Link to="/register">Register</Link>
        //     </div> */}
        //   </>
        // ) : (
        //   <div>
        //     <Link to="/gameplay">Play Game</Link>
        //     <h1>
        //       {user.first_name} {user.last_name}
        //     </h1>
        //     <Link to="/logout">Logout</Link>
        //   </div>
        // )
      }

      <Switch>
        <Route exact path="/" component={Home}></Route>
        {!user ? (
          <Switch>
            <Route path="/login" children={<Login />}></Route>
            <Route path="/register" component={Register}></Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/gameplay" component={Game}></Route>
            <Route path="/logout" component={Logout}></Route>
          </Switch>
        )}
      </Switch>
    </div>
  );
}
