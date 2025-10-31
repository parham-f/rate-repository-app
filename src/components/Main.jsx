import { StyleSheet, View } from "react-native";
import RepositoryList from "./Repository/RepositoryList";
import SignIn from "./User/SignIn";
import SingleRepository from "./Repository/SingleRepository";
import SignOut from "./User/SignOut";
import SignUpForm from "./User/SignUpForm";
import ReviewForm from "./Review/ReviewForm";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Route, Routes, Navigate } from "react-router-native";
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
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/:repoID" element={<SingleRepository />} />
          <Route path="/createReview" element={<ReviewForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </SafeAreaProvider>
  );
};

export default Main;
