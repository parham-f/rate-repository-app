import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppBar from "./AppBar";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppBar />
        <RepositoryList />
      </View>
    </SafeAreaProvider>
  );
};

export default Main;
