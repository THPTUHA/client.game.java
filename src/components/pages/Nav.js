import { Route, Switch, Redirect } from "react-router-dom";
import React, { useContext, useEffect } from "react";
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
import PostNews from "../admin/PostNews";
import Admin from "../admin/Admin";
import News from "../admin/News";
import User from "../admin/User";
import UpdateNews from "../admin/UpdateNews";

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

            <Route exact path="/admin">
              {!user ? <Redirect to="/" /> : <Admin />}
            </Route>
            <Route exact path="/admin/news">
              {!user ? <Redirect to="/" /> : <News />}
            </Route>
            <Route path="/admin/news/post">
              {!user ? <Redirect to="/" /> : <PostNews />}
            </Route>
            <Route path="/admin/news/update">
              {!user ? <Redirect to="/" /> : <UpdateNews />}
            </Route>
            <Route exact path="/admin/user">
              {!user ? <Redirect to="/" /> : <User />}
            </Route>
            <Route component={NotFound} />
          </Switch>
          <GoToTop />
        </>
      )}
    </div>
  );
}
