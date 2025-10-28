import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {String(error.message || error)}</Text>;

  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
