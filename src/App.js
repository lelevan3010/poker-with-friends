import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";
import NotFound from "./404";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/room/:roomId" component={ChatRoom} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
