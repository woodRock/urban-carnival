import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_REPOSITORIES = gql`
  {
    viewer {
      repositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            name
            description
            openGraphImageUrl
            url
          }
        }
      }
    }
  }
`;

const GitRepositories = () => (
  <Query query={GET_REPOSITORIES}>
    {({ loading, error, data }) => {
      if (loading) return <h4>Loading</h4>;
      if (error) console.log(error);
      const {
        viewer: {
          repositories: { edges }
        }
      } = data;
      return (
        <div>
          <ul>
            {edges.map(edge => (
              <Repository {...edge.node} />
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

const Repository = ({ name, description, openGraphImageUrl, url }) => {
  return (
    <>
      <h1>{name}</h1>
      <li>{description}</li>
      <img src={openGraphImageUrl} alt="Repository social preview" />
      <a href={url}>Link</a>
    </>
  );
};

export default GitRepositories;
