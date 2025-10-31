import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";
import Text from "../components/Text";


const userQuery = (withReviewsBoolean) => {
    const { data, loading, error, refetch } = useQuery(ME, {
    variables: { withReviews: withReviewsBoolean},
    fetchPolicy: 'cache-and-network'
  });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return {data, refetch};
};

export default userQuery;