import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import { TOKEN } from "./utils/constants";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./views/Auth/Login/Login";
import Register from "./views/Auth/Register/Register";
import Dashboard from "./views/Dashboard/Dashboard";

function MainApp() {
  return (
    <div className="background1">
      <Switch>
        <PrivateRoute exact path="/">
          {Cookies.get(TOKEN) ? (
            <Redirect to="/dashboard/" />
          ) : (
            <Redirect to="/login/" />
          )}
        </PrivateRoute>
        <PrivateRoute path="/dashboard/">
          <Dashboard />
        </PrivateRoute>
        <Route path="/register/">
          {Cookies.get(TOKEN) ? <Redirect to="/dashboard/" /> : <Register />}
        </Route>
        <Route path="/login/">
          {Cookies.get(TOKEN) ? <Redirect to="/dashboard/" /> : <Login />}
        </Route>
      </Switch>
    </div>
  );
}

export default MainApp;
