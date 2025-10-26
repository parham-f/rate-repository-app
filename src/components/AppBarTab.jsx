import { Pressable } from "react-native";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabs: {
    marginRight: "10",
  },
});

const tabs = [
  {
    name: "Repositories",
    onPress: () => {},
  },
];

const AppBarTab = () => {
  return (
    <>
      {tabs.map((tab) => (
        <Pressable onPress={tab.onPress} key={tab.name}>
          <Appbar.Content style={styles.tabs} color="white" title={tab.name} />
        </Pressable>
      ))}
    </>
  );
};

export default AppBarTab;
