import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const PAGE_SIZE = 6;

const useRepositories = ({ sortOption, searchQuery }) => {
  const base = {
    searchKeyword: searchQuery || undefined,
    orderBy: sortOption?.orderBy,
    orderDirection: sortOption?.orderDirection,
    first: PAGE_SIZE,
  };

  const { data, error, loading, fetchMore, networkStatus } = useQuery(
    GET_REPOSITORIES,
    {
      variables: base,
      fetchPolicy: 'cache-and-network',
      returnPartialData: true,
      notifyOnNetworkStatusChange: true,
    }
  );

  const handleFetchMore = () => {
    const pageInfo = data?.repositories?.pageInfo;
    if (loading || !pageInfo?.hasNextPage) return;
    return fetchMore({
      variables: { ...base, after: pageInfo.endCursor },
    });
  };

  const repositories = data?.repositories?.edges?.map(e => e.node) ?? [];
  return { repositories, loading, error, fetchMore: handleFetchMore, networkStatus };
};

export default useRepositories;
