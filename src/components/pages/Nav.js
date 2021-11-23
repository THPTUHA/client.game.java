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
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/news" component={NewsList}></Route>
      <Route path="/login">
               <Login />
        </Route>
      {user === "unload" ? (
        <Loading />
      ) : (
        <>
          <Switch>
            <Route path="/register">
              {user ? <Redirect to="/" /> : <Register />}
            </Route>

            <Route path="/gameplay">
              {!user ? <Redirect to="/login" /> : <Game />}
            </Route>
            <Route exact path="/account">
              {!user ? <Redirect to="/login" /> : <Account />}
            </Route>
            <Route path="/account/edit">
              {!user ? <Redirect to="/login" /> : <EditingAccount />}
            </Route>

            <Route exact path="/admin">
              {!user ? <Redirect to="/login" /> : <Admin />}
            </Route>
            <Route exact path="/admin/news">
              {!user ? <Redirect to="/login" /> : <News />}
            </Route>
            <Route path="/admin/news/post">
              {!user ? <Redirect to="/login" /> : <PostNews />}
            </Route>
            <Route path="/admin/news/update">
              {!user ? <Redirect to="/login" /> : <UpdateNews />}
            </Route>
            <Route exact path="/admin/user">
              {!user ? <Redirect to="/login" /> : <User />}
            </Route>
            <Route component={NotFound} />
          </Switch>
          <GoToTop />
        </>
      )}
    </div>
  );
}
