import React from "react";
import { Route, Link, Switch } from "react-router-dom";

const sidebar = (props) => {
  function viewPages() {
    return localStorage.getItem("token") === null ? (
      ""
    ) : (
      <li>
        <Link to="/">Home</Link>
      </li>
    );
  }

  function viewPages2() {
    return localStorage.getItem("userRole") === "Admin" ? (
      <li>
        <Link to="/Admin">Admin Panel</Link>
      </li>
    ) : (
      ""
    );
  }

  function viewPages3() {
    return localStorage.getItem("token") === null ? (
      ""
    ) : (
      <li>
        <Link to="/Destination">Destinations</Link>
      </li>
    );
  }

  return (
    <div className="sitebar-all">
      <div className="sidebar">
        <div className="sidebar-list-styling">
          <ul className="sidebar-list list-unstyled">
            {viewPages()}
            {viewPages3()}
            {viewPages2()}
          </ul>
        </div>
      </div>
      <div className="sidebar-route">
        <Switch>
          <Route exact path="/">
            {props.protectedViews()}
          </Route>
          <Route exact path="/Destination">
            {props.protectedViewsTwo()}
          </Route>
          <Route exact path="/Admin">
            {props.protectViewsThree()}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default sidebar;
