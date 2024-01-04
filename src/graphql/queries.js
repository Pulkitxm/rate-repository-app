import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query ExampleQuery {
    repositories {
      edges {
        node {
          id
          url
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
  `;
  
export const SIGNIN = gql`
  mutation SignIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const ME = gql`
  query Query {
    me {
      id
      username
    }
  }
`;