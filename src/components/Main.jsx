import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
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
