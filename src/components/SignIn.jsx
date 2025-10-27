import { Pressable, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { useFormik } from "formik";

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />

      <Pressable style={styles.pressable} onPress={formik.handleSubmit}>
        <Text style={styles.pressableText} fontWeight="bold">
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    padding: 8,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3,
    marginBottom: 8,
    padding: 8,
  },
  pressable: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 8,
  },
  pressableText: {
    color: "white",
    textAlign: "center",
  },
});

export default SignIn;
