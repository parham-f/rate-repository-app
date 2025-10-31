import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";
import { Appbar } from "react-native-paper";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  header: {
    backgroundColor: theme.colors.appBarBackground,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <AppBarTab />
      </Appbar.Header>
    </View>
  );
};

export default AppBar;
