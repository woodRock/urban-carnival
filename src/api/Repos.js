import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Repos = () => (
  <Query
    query={gql`
      query {
        viewer {
          login
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>loading ...</p>;
      if (error) return <p>Error :( {error.message} )</p>;

      return data.viewer.repositories.edges.map(({ repo }) => (
        <>
          <Repository {...repo} />
        </>
      ));
    }}
  </Query>
);

const Repository = ({ name, description, openGraphImageUrl, url }) => (
  <table>
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{openGraphImageUrl}</td>
      <td>{url}</td>
    </tr>
  </table>
);

export default Repos;
