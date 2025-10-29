import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepository = (repositoryId) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { repositoryId },
    skip: !repositoryId,
    fetchPolicy: 'cache-and-network'
  });

  return {
    repository: data?.repository ?? null,
    loading,
    error,
  };
};

export default useRepository;
