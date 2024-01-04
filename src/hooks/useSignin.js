import { useApolloClient, useMutation } from "@apollo/client";
import { SIGNIN } from "../graphql/queries";
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const [signInMutation, result] = useMutation(SIGNIN);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const signIn = async (username, password) => {
        const res = await signInMutation({ variables: { username, password } });
        const accessToken = res.data.authenticate.accessToken;
        await authStorage.setAccessToken(accessToken);
        apolloClient.resetStore();
        return {
            username,
            accessToken,
        }
    };

    return { signIn, result };
};

export default useSignIn;
