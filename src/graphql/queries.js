import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
          ownerName
          name
          url
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
          reviews {
            edges {
              node {
                userId
                rating
                text
                id
              }
            }
          }
        }
      }
    }
  }
  `;

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!) {
  repository(id: $repositoryId) {
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
          reviews {
            edges {
              node {
                userId
                rating
                text
                id
                user {
                  username
                }
                createdAt
              }
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

export const CREATE_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

export const GET_REPO_NAME_BY_AUTHOR_NAME = gql`
  query Query($ownerName: String) {
    repositories(ownerName: $ownerName) {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      id
    }
  }
`;