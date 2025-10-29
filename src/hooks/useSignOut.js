import useAuthStorage from './useAuthStorage';
import { apolloClient } from '../../App';

const useSignOut = async () => {
    const authStorage = useAuthStorage();
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
};

export default useSignOut;
