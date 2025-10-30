import { useMutation } from '@apollo/client/react';
import { SIGNUP } from '../graphql/mutations';
import { apolloClient } from '../../App';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { user: { username, password } },
    });
    return data?.createUser?.username;
  };
  return [signUp, result];
};

export default useSignUp;
