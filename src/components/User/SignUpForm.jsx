import { Pressable, View, StyleSheet } from "react-native";
import theme from "../../theme";
import Text from "../Text";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "react-native-paper";
import useSignUp from "../../hooks/useSignUp";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters!")
    .max(30, "Username cannot exceed 30 characters!")
    .required("Username is required!"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters!")
    .max(30, "Password cannot exceed 30 characters!")
    .required("Password is required!"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password does not match!")
    .required("Password confirmation is required!"),
});

const SignUpForm = () => {
  const [signUp, { loading, error }] = useSignUp();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        username: values.username,
        password: values.password,
      };
      try {
        await signUp(payload);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    },
  });

  const usernameErr = !!(formik.touched.username && formik.errors.username);
  const passwordErr = !!(formik.touched.password && formik.errors.password);
  const passwordConfirmationErr = !!(
    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation
  );

  return (
    <View style={styles.row}>
      <TextInput
        mode="outlined"
        label="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        error={usernameErr}
        style={styles.input}
      />
      {usernameErr && (
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
        error={passwordErr}
        style={styles.input}
      />
      {passwordErr && (
        <Text style={{ color: theme.colors.errorText }}>
          {formik.errors.password}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
        error={passwordConfirmationErr}
        style={styles.input}
      />
      {passwordConfirmationErr && (
        <Text style={{ color: theme.colors.errorText }}>
          {formik.errors.passwordConfirmation}
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
          Sign up
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

export default SignUpForm;
