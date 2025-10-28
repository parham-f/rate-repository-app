import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
    repositories {
        edges {
            node {
                fullName
                description
                language
                ownerAvatarUrl
                ratingAverage
                reviewCount
                stargazersCount
                forksCount
            }
        }
    }
}
`;