import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/queries";
const useSignUp = () => {
    const [signUpMutation, result] = useMutation(CREATE_USER);
    const apolloClient = useApolloClient();
    const signUp = async (username, password) => {
        const res = await signUpMutation({ variables: { user:{username, password} } });
        apolloClient.resetStore();
        return username
    };
    return { signUp, result };
};
export default useSignUp;