import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query ExampleQuery {
    repositories {
      edges {
        node {
          id
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