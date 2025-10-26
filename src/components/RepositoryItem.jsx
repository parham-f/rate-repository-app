import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const formatNumberToK = (num) => {
  if (Math.abs(num) < 1000) {
    return num;
  }

  const flooredK = Math.floor(Math.abs(num) / 100);

  const sign = Math.sign(num);
  return (sign * flooredK) / 10 + "k";
};

const Stat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold">{formatNumberToK(value)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.infoCol}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>

          {item.language && (
            <View style={styles.languagePill}>
              <Text style={styles.languageText}>{item.language}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat label="Stars" value={item.stargazersCount} />
        <Stat label="Forks" value={item.forksCount} />
        <Stat label="Reviews" value={item.reviewCount} />
        <Stat label="Rating" value={item.ratingAverage} />
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  description: {
    marginTop: 4,
  },
  languagePill: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  languageText: {
    color: "white",
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
});

export default RepositoryItem;
