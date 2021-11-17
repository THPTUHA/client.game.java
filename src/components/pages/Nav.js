import { Route, Switch, Redirect } from "react-router-dom";
import React, { useContext, lazy } from "react";
import Register from "../authorization/Register";
import Home from "../home/Home";
import Login from "../authorization/Login";
import { UserContext } from "../../context/UserProvider";
import Logout from "../authorization/Logout";
import Game from "../game/Game";
import NavBar from "../navbar/NavBar";
import Account from "../account/Account";
import NewsList from "../news/NewsList";
import GoToTop from "../GoToTop";
import NotFound from "./NotFound";
import Loading from "../../loading/Loading";
import EditingAccount from "../account/EditingAccount";
import PostNews from "../news/PostNews";

export default function Nav() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user == "unload" ? (
        <Loading />
      ) : (
        <>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/news" component={NewsList}></Route>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/register">
              {user ? <Redirect to="/" /> : <Register />}
            </Route>
            <Route path="/gameplay">
              {!user ? <Redirect to="/" /> : <Game />}
            </Route>

            <Route path="/logout">
              <Logout />
            </Route>
            <Route exact path="/account">
              {!user ? <Redirect to="/" /> : <Account />}
            </Route>
            <Route path="/account/edit">
              {!user ? <Redirect to="/" /> : <EditingAccount />}
            </Route>
            <Route path="/news/post">
              {!user ? <Redirect to="/" /> : <PostNews />}
            </Route>
            <Route component={NotFound} />
          </Switch>
          <GoToTop />
        </>
      )}
    </div>
  );
}
