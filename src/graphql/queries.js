import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String,$first:Int, $after:String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword,first:$first, after: $after) {
    totalCount
    edges {
      node {
        id ownerName name url fullName description language forksCount stargazersCount ratingAverage reviewCount ownerAvatarUrl reviews { edges { node { userId rating text id } } }
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
  `;

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!,$first:Int, $after:String) {
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
          reviews(first:$first, after: $after) {
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
              cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
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

export const ME_REVIEWS = gql`
  query Me {
    me {
      reviews {
        edges {
          node {
            id
            rating
            createdAt
            text
            user{
              username
            }
            repository {
                id 
              }
          }
        }
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
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