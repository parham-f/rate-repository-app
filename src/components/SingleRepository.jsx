import Text from "./Text";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const { repoID } = useParams();

  const { repository, loading, error } = useRepository(repoID);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {String(error.message || error)}</Text>;

  return <RepositoryItem item={repository} isSingleRepo={true} />;
};

export default SingleRepository;
