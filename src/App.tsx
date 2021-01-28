import { ApolloProvider } from "@apollo/client";
import React from "react";
import { initDB } from "react-indexed-db";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import { DBConfig } from "./config/DbConfig";
import { client } from "./graphql/client";
import CatchPokemon from "./pages/CatchPokemon";
import Details from "./pages/Details";
import Home from "./pages/Home";
import { ThemeProvider } from "./theme/ThemeContext";

function App() {
  initDB(DBConfig);

  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pokemon-details" exact component={Details} />
            <Route path="/catching-pokemon" exact component={CatchPokemon} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
