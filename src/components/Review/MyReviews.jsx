import { StyleSheet, View, FlatList } from "react-native";
import userQuery from "../../utils/userQuery";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const userInfo = userQuery(true);
  const reviews = data?.me?.reviews?.edges?.node?.repository?.reviews?.edges
    ? data.me.reviews.edges.node.repository.reviews.edges
    : "";

  console.log(reviews);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
