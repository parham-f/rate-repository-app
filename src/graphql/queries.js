import { gql } from '@apollo/client';
import { REPOSITORY_BASE_FIELDS, REPOSITORY_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $searchKeyword: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $first: Int
    $after: String
  ) {
    repositories(
      searchKeyword: $searchKeyword
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      after: $after
    ) {
      edges {
        node { ...repositoryBaseFields }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_REPOSITORY_BY_ID = gql`
  query GetRepositoryById($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...repositoryInfo
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user { id username }
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
  ${REPOSITORY_INFO}
`;

export const ME = gql`
query ($withReviews: Boolean!){
  me {
    username
    reviews @include(if: $withReviews){
      edges {
        node {
          id
          rating
          user {
            username
          }
          createdAt
          repositoryId
          text
        }
      }
    }
  }
}
`;