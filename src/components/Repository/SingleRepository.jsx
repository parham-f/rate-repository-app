import Text from "../Text";
import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "../Review/ReviewItem";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { NetworkStatus } from "@apollo/client";
import { useMemo } from "react";

const styles = StyleSheet.create({ separator: { height: 10 } });
const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { repoID } = useParams();
  const { repository, reviewNodes, loading, error, loadMore, networkStatus } =
    useRepository(repoID);

  const header = useMemo(
    () => (
      <View>
        {repository && <RepositoryItem item={repository} isSingleRepo={true} />}
        {networkStatus === NetworkStatus.fetchMore && (
          <ActivityIndicator style={{ margin: 8 }} />
        )}
      </View>
    ),
    [repository, networkStatus]
  );

  if (error) return <Text>Error: {String(error.message || error)}</Text>;
  if (loading && !repository) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={header}
      ListFooterComponent={<View style={{ marginBottom: 20 }} />}
      onEndReachedThreshold={0.2}
      onEndReached={loadMore}
    />
  );
};

export default SingleRepository;
