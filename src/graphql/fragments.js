import { gql } from '@apollo/client';

export const REPOSITORY_BASE_FIELDS = gql`
  fragment repositoryBaseFields on Repository {
    id
    name
    ownerName
    fullName
    stargazersCount
    forksCount
    ratingAverage
    reviewCount
    url
    ownerAvatarUrl
    description
    language
    createdAt
  }
`;

export const REPOSITORY_INFO = gql`
  fragment repositoryInfo on Repository {
    id
    name
    ownerName
    fullName
    stargazersCount
    forksCount
    ratingAverage
    reviewCount
    url
    ownerAvatarUrl
    description
    language
    createdAt
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
`;