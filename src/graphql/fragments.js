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