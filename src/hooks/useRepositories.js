import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import Text from '../components/Text';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
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
