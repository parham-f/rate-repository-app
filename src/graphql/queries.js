import { gql } from '@apollo/client';
import { REPOSITORY_BASE_FIELDS, REPOSITORY_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
query ($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
        edges {
            node {
                ...repositoryBaseFields
            }
        }
    }
}
${REPOSITORY_BASE_FIELDS}
`;

export const GET_REPOSITORY_BY_ID = gql`
query ($repositoryId: ID!) {
  repository(id: $repositoryId) {
    ...repositoryInfo
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
          repository {
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
        }
      }
    }
  }
}
${REPOSITORY_BASE_FIELDS}
`;