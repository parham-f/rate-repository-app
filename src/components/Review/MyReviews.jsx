import { StyleSheet, View, FlatList } from "react-native";
import userQuery from "../../utils/userQuery";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const data = userQuery(true);
  const reviews = data?.me?.reviews?.edges?.map((e) => e.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={<View></View>}
      ListFooterComponentStyle={{ marginBottom: 20 }}
    />
  );
};

export default MyReviews;
