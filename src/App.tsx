import { ApolloProvider } from "@apollo/client";
import React from "react";

import { client } from "./graphql/client";
import Home from "./pages/Home";
import { ThemeProvider } from "./theme/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
