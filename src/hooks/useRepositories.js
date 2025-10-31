import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';
import Text from '../components/Text';

const useRepositories = ({sortOption, searchQuery}) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      searchKeyword: searchQuery,
      orderBy: sortOption.orderBy,
      orderDirection: sortOption.orderDirection,
    },
    fetchPolicy: 'cache-and-network',
    returnPartialData: true
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repositories =
    data?.repositories?.edges?.map(e => e.node) ??
    data?.repositories ??
    [];

  return { repositories, loading, error };
};

export default useRepositories;
