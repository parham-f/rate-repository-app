import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";
import Text from "../components/Text";


const userQuery = () => {
    const { data, loading, error } = useQuery(ME);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const user = data?.me?.username ? data.me.username : "";
    return user;
};

export default userQuery;