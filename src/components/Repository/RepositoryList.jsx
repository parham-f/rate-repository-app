import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import Text from "../Text";
import RepositoryItem from "./RepositoryItem";
import ListOrderSelect from "./ListOrderSelect";
import SearchBar from "./SearchBar";
import useRepositories from "../../hooks/useRepositories";
import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { NetworkStatus } from "@apollo/client";

const styles = StyleSheet.create({ separator: { height: 10 } });
const ItemSeparator = () => <View style={styles.separator} />;

const SORT_OPTIONS = {
  latestRepo: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  highestRate: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  lowestRate: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
};

const RepositoryList = () => {
  const [sortKey, setSortKey] = useState("latestRepo");
  const sortOption = SORT_OPTIONS[sortKey];

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const { repositories, error, loading, fetchMore, networkStatus } =
    useRepositories({ sortOption, searchQuery: debouncedQuery });

  const header = useMemo(
    () => (
      <View>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ListOrderSelect sortKey={sortKey} setSortKey={setSortKey} />
        {networkStatus === NetworkStatus.fetchMore && (
          <ActivityIndicator style={{ margin: 8 }} />
        )}
      </View>
    ),
    [searchQuery, sortKey, networkStatus]
  );

  if (error) return <Text>Error: {String(error.message || error)}</Text>;
  if (loading && repositories.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => (
        <RepositoryItem item={item} isSingleRepo={false} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={header}
      keyboardShouldPersistTaps="handled"
      ListFooterComponent={<View style={{ marginBottom: 20 }} />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;
