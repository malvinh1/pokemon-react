import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { client } from "./graphql/client";
import Details from "./pages/Details";
import Home from "./pages/Home";
import { ThemeProvider } from "./theme/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pokemon-details" exact component={Details} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
