import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { parseISO, format } from "date-fns";

const ReviewItem = ({ review }) => {
  return (
    <View testID="reviewItem" style={styles.card}>
      <View style={styles.headerRow}>
        <Text color="primary" fontWeight="bold" style={styles.rating}>
          {review.rating}
        </Text>
        <View style={styles.infoCol}>
          <Text fontWeight="bold" fontSize="subheading">
            {review.user.username}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {format(parseISO(review.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text fontSize="subheading">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.repositoryBackground || "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
  },
  rating: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 50 / 2,
    textAlign: "center",
    paddingTop: 10,
    fontSize: 18,
    marginRight: 15,
  },
  infoCol: {
    flex: 1,
  },
  description: {
    marginTop: 4,
  },
});

export default ReviewItem;
