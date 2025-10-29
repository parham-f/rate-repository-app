import { gql } from '@apollo/client';
import { REPOSITORY_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
query {
    repositories {
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
    ...repositoryBaseFields
  }
}
${REPOSITORY_BASE_FIELDS}
`;

export const ME = gql`
query {
  me {
    username
  }
}
`;