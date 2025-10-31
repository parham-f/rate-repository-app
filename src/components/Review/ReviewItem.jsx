import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "../Text";
import theme from "../../theme";
import { parseISO, format } from "date-fns";
import { useLocation, useNavigate } from "react-router-native";
import useRemoveReview from "../../hooks/useRemoveReview";

const ReviewItem = ({ review, refetch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deleteReview] = useRemoveReview();

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
      {location.pathname === "/myReviews" && (
        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.pressablePrimary}
            onPress={() => navigate(`/${review.repositoryId}`)}
          >
            <Text style={styles.pressableText} fontWeight="bold">
              View Repository
            </Text>
          </Pressable>
          <Pressable
            style={styles.pressableRed}
            onPress={() => {
              try {
                Alert.alert(
                  "Delete Review",
                  "Are you sure you want to delete this review?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: async () => {
                        await deleteReview(review.id);
                        refetch();
                      },
                    },
                  ],
                  { cancelable: true, onDismiss: () => {} }
                );
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <Text style={styles.pressableText} fontWeight="bold">
              Delete Review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.repositoryBackground || "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 5,
    margin: 15,
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
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 15,
  },
  pressablePrimary: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    marginHorizontal: 5,
    padding: 8,
    opacity: 1,
  },
  pressableRed: {
    flex: 1,
    backgroundColor: theme.colors.errorText,
    borderRadius: 3,
    marginHorizontal: 5,
    padding: 8,
    opacity: 1,
  },
  pressableText: { color: "white", textAlign: "center" },
});

export default ReviewItem;
