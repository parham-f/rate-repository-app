import { Pressable, View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "react-native-paper";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner is required!"),
  repositoryName: yup.string().required("Repository name is required!"),
  rating: yup
    .number()
    .transform((value, originalValue) => {
      const n = Number(originalValue);
      return Number.isNaN(n) ? undefined : n;
    })
    .typeError("Rating must be a number")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating cannot exceed 100")
    .required("Rating is required!"),
  text: yup.string().nullable(),
});

const ReviewForm = () => {
  const [createReview, { loading, error }] = useCreateReview();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          ownerName: values.ownerName.trim(),
          repositoryName: values.repositoryName.trim(),
          rating: Number(values.rating),
          text: values.text?.trim() || null,
        };
        const res = await createReview(payload);
        navigate(`/${res?.createReview?.repository?.id}`);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const ownerNameErr = !!(formik.touched.ownerName && formik.errors.ownerName);
  const repositoryNameErr = !!(
    formik.touched.repositoryName && formik.errors.repositoryName
  );
  const ratingErr = !!(formik.touched.rating && formik.errors.rating);
  const textErr = !!(formik.touched.text && formik.errors.text);

  return (
    <View style={styles.row}>
      <TextInput
        mode="outlined"
        label="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        error={ownerNameErr}
        style={styles.input}
      />
      {ownerNameErr && (
        <Text style={{ color: theme.colors.errorText }}>
          {formik.errors.ownerName}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
        error={repositoryNameErr}
        style={styles.input}
      />
      {repositoryNameErr && (
        <Text style={{ color: theme.colors.errorText }}>
          {formik.errors.repositoryName}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Rating between 0 and 100"
        value={String(formik.values.rating ?? "")}
        onChangeText={(text) => formik.setFieldValue("rating", text)}
        onBlur={formik.handleBlur("rating")}
        error={ratingErr}
        keyboardType="numeric"
        inputMode="numeric"
        style={styles.input}
      />
      {ratingErr && (
        <Text style={{ color: theme.colors.errorText }}>
          {formik.errors.rating}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Review"
        multiline
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
        error={textErr}
        style={styles.input}
      />
      {textErr && (
        <Text style={{ color: theme.colors.errorText }}>
          {formik.errors.text}
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
          Create a review
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

export default ReviewForm;
