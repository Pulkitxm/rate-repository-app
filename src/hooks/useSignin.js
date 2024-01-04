import { useMutation } from "@apollo/client";
import { SIGNIN } from "../graphql/queries";

const useSignIn = () => {
    const [signInMutation, result] = useMutation(SIGNIN);
    const signIn = async (username, password) => {
        const res = await signInMutation({ variables: { username, password } });
        return {
            username,
            accessToken: res.data.authenticate.accessToken,
        }
    };

    return { signIn, result };
};

export default useSignIn;
