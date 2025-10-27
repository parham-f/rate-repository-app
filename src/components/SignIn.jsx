import { Pressable, View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "react-native-paper";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters!")
    .required("Username is required!"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters!")
    .required("Password is required!"),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const userErr = !!(formik.touched.username && formik.errors.username);
  const passErr = !!(formik.touched.password && formik.errors.password);

  return (
    <View style={styles.row}>
      <TextInput
        mode="outlined"
        label="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        error={userErr}
        style={styles.input}
      />
      {userErr && (
        <Text style={{ color: theme.colors.errorText }}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        error={passErr}
        style={styles.input}
      />
      {passErr && (
        <Text style={{ color: theme.colors.errorText }}>
          {formik.errors.password}
        </Text>
      )}

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
    marginBottom: 8,
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
