import { View } from "react-native";
import Text from "./Text";

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text fontWeight="bold" fontSize="subheading">
        Full name: {item.fullName}
      </Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Starts: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
