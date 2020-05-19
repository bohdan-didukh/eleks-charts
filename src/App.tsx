import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Donut } from "./Donut";
import { VerticalBar } from "./VerticalBar";
import { Footer } from "./Footer";
import { Eleks } from "./Eleks";
import { Details } from "./Details";
import { Navigation } from "./Navigation/Navigation";

function App() {
  return (
    <Router>
      <header>
        <main>
          <Eleks />
        </main>
      </header>
      <main>
        <Details />
        <Navigation />
      </main>
      <Switch>
        <Route path="/" exact>
          <>
            <main>
              <Donut />
            </main>
            <Footer />
          </>
        </Route>
        <Route path="/bar" exact>
          <main>
            <VerticalBar />
          </main>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
