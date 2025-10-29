import { render, screen, fireEvent, waitFor  } from '@testing-library/react-native';
import { View, StyleSheet, Pressable, TextInput} from 'react-native';
import theme from '../../theme';
import Text from '../../components/Text';
import { useFormik } from 'formik';

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

const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.row}>
      <TextInput
        mode="outlined"
        label="Username"
        testID="username-input"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        style={styles.input}
      />

      <TextInput
        mode="outlined"
        label="Password"
        testID="password-input"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        style={styles.input}
      />

      <Pressable
        style={styles.pressable}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.pressableText} fontWeight="bold">
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit}/>);
      fireEvent.changeText(screen.getByTestId('username-input'), 'kalle');
      fireEvent.changeText(screen.getByTestId("password-input"), 'password');
      fireEvent(screen.getByText('Sign In'), 'click');
      screen.debug()

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
            username: 'kalle',
            password: 'password',
        });
      });
    });
  });
});