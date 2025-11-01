import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import { NetworkStatus } from '@apollo/client';

const PAGE_SIZE = 4;

const useRepository = (repositoryId) => {
  const baseVars = {
    repositoryId,
    first: PAGE_SIZE,
  };

  const { data, loading, error, fetchMore, networkStatus } = useQuery(
    GET_REPOSITORY_BY_ID,
    {
      variables: baseVars,
      skip: !repositoryId,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      returnPartialData: true,
    }
  );

  const loadMore = () => {
    const pageInfo = data?.repository?.reviews?.pageInfo;
    if (!pageInfo?.hasNextPage || networkStatus === NetworkStatus.fetchMore) return;

    return fetchMore({
      variables: {
        ...baseVars,
        after: pageInfo.endCursor,
      },
    });
  };

  const repository = data?.repository ?? null;
  const reviewNodes = repository?.reviews?.edges?.map(e => e.node) ?? [];

  return { repository, reviewNodes, loading, error, loadMore, networkStatus };
};

export default useRepository;
