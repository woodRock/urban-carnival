import React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

/**
 * Github Api GraphiQL explorer available online:
 * https://developer.github.com/v4/explorer/
 */

const GET_REPOSITORIES = gql`
  query(
    $limit: Int = 10
    $field: String = "CREATED_AT"
    $order: String = "DESC"
  ) {
    viewer {
      repositories(
        first: $limit
        orderBy: { field: $field, direction: $order }
      ) {
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

const GitRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  if (loading) return <h4>Loading</h4>;
  if (error) console.log(error);
  const {
    viewer: {
      repositories: { edges }
    }
  } = data;

  return (
    <>
      <div>
        {edges.map(edge => (
          <Repository {...edge.node} />
        ))}
      </div>
    </>
  );
};

const Repository = ({ name, description, openGraphImageUrl, url }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderStyle: "solid"
        }}
      >
        <h1>{name}</h1>
        <li>{description}</li>
        <a href={url}>
          <img
            src={openGraphImageUrl}
            alt="Repository social preview"
            style={{
              height: "300px",
              width: "300px"
            }}
          />
        </a>
      </div>
    </>
  );
};

export default GitRepositories;
