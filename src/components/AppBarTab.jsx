import { Pressable, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = () => {
  const tabs = [
    {
      name: "Repositories",
      linkTo: "/",
    },
    {
      name: "SignIn",
      linkTo: "/signin",
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.linkTo}
          component={Pressable}
          accessibilityRole="link"
          style={styles.tab}
        >
          <Text style={styles.tabText}>{tab.name}</Text>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  tabText: {
    color: "white",
    fontWeight: "600",
  },
});

export default AppBarTab;
