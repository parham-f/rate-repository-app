import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import RepositoryItem from "./RepositoryItem";
import ListOrderSelect from "./ListOrderSelect";
import SearchBar from "./SearchBar";
import useRepositories from "../../hooks/useRepositories";
import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";

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

  const { repositories, error, loading, networkStatus } = useRepositories({
    sortOption,
    searchQuery: debouncedQuery,
  });

  if (error) return <Text>Error: {String(error.message || error)}</Text>;

  const header = useMemo(
    () => (
      <View>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ListOrderSelect sortKey={sortKey} setSortKey={setSortKey} />
        {networkStatus === 4 && <ActivityIndicator style={{ margin: 8 }} />}
      </View>
    ),
    [searchQuery, sortKey, networkStatus]
  );

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
      ListFooterComponent={<View></View>}
      ListFooterComponentStyle={{ marginBottom: 20 }}
    />
  );
};

export default RepositoryList;
