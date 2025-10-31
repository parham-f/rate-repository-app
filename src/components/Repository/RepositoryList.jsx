import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import ListOrderSelect from "./ListOrderSelect";
import useRepositories from "../../hooks/useRepositories";
import Text from "../Text";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SORT_OPTIONS = {
  latestRepo: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  highestRate: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  lowestRate: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
};

const RepositoryList = () => {
  const [sortKey, setSortKey] = useState("latestRepo");
  const sortOption = SORT_OPTIONS[sortKey];
  const { repositories, loading, error } = useRepositories({ sortOption });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {String(error.message || error)}</Text>;

  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => (
        <RepositoryItem item={item} isSingleRepo={false} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <ListOrderSelect sortKey={sortKey} setSortKey={setSortKey} />
      )}
    />
  );
};

export default RepositoryList;
