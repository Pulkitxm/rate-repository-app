// "review": {
//     "text": null,
//     "repositoryName": null,
//     "rating": null,
//     "ownerName": null
// }
import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/queries";
const useReview = () => {
    const [reviewMutation, result] = useMutation(CREATE_REVIEW);
    const apolloClient = useApolloClient();
    const addReview = async (text, repositoryName, rating, ownerName) => {
        try {
            const res = await reviewMutation({ variables: { review: { text, repositoryName, rating:parseInt(rating), ownerName } } });
            apolloClient.resetStore();
            return res
        } catch (err) {
            console.log(err.message);
        }
    };
    return { addReview, result };
};
export default useReview;