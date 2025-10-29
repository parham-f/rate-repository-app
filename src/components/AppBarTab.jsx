import { Pressable, ScrollView, View } from "react-native";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import userQuery from "../utils/userQuery";

const AppBarTab = () => {
  const user = userQuery();

  const tabs = [
    { name: "Repositories", linkTo: "/" },
    user
      ? { name: "SignOut", linkTo: "/signout" }
      : { name: "SignIn", linkTo: "/signin" },
  ];

  return (
    <>
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

      {user && (
        <View style={styles.tab}>
          <Text style={styles.tabText}>{user}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingRight: 8 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  tabText: { color: "white", fontWeight: "600" },
});

export default AppBarTab;
