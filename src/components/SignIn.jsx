import { Pressable, View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "react-native-paper";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

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
  const [signIn, { loading, error }] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn(values);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
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

      {error && (
        <Text style={{ color: theme.colors.errorText }}>{error.message}</Text>
      )}

      <Pressable
        style={styles.pressable}
        onPress={formik.handleSubmit}
        disabled={loading}
      >
        <Text style={styles.pressableText} fontWeight="bold">
          {loading ? "Signing in..." : "Sign In"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "column", padding: 8, backgroundColor: "white" },
  input: { marginBottom: 8 },
  pressable: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 8,
    opacity: 1,
  },
  pressableText: { color: "white", textAlign: "center" },
});

export default SignIn;
