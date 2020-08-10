import React from "react";
import "./App.css";
import { ApolloProvider } from "react-apollo";
import client from "./api/Apollo";
import GitRepositories from "./api/Repos";

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <h1>Repositories</h1>
        <GitRepositories />
      </ApolloProvider>
    </>
  );
};

export default App;
