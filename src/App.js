import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import useAuth from "./hooks/useAuth";
import "./assets/styles.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Project from "./pages/Project";

export default function App() {
  const [user, authLoading] = useAuth();

  return (
    <Router>
      <Navbar authLoading={authLoading} user={user} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/project/:projectId" component={Project} />
      </Switch>
    </Router>
  );
}
