import Text from "../Text";
import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "../Review/ReviewItem";
import { StyleSheet, View, FlatList } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { repoID } = useParams();

  const { repository, loading, error } = useRepository(repoID);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {String(error.message || error)}</Text>;

  const reviews =
    repository?.reviews?.edges?.map((e) => e.node) ?? repository ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} isSingleRepo={true} />
      )}
      ListFooterComponent={<View></View>}
      ListFooterComponentStyle={{ marginBottom: 20 }}
    />
  );
};

export default SingleRepository;
