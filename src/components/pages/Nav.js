import { Link, Route, Switch, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import Register from "../authorization/Register";
import Home from "../home/Home";
import Login from "../authorization/Login";
import { UserContext } from "../../context/UserProvider";
import Logout from "../authorization/Logout";
import Game from "../game/Game";
import GameXO from "../game/xo/GameXO";
import NavBar from "../navbar/NavBar";
import News from "../news/News";
import Account from "../account/Account";
import ListNews from "../news/ListNews";
import GoToTop from "../GoToTop";
import NotFound from "./NotFound";

export default function Nav() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/news" component={ListNews}></Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/gameplay">{!user ? <Redirect to="/" /> : <Game />}</Route>
        <Route path="/logout">{!user ? <Redirect to="/" /> : <Logout />}</Route>
        <Route path="/account">
          {!user ? <Redirect to="/" /> : <Account />}
        </Route>
        <Route component={NotFound} />
      </Switch>
      <GoToTop />
    </div>
  );
}
