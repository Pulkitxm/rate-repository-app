import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
const useRepository = (variables) => {
    const { data, loading, error, refetch, fetchMore } = useQuery(GET_REPOSITORY, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };
    return { data, loading, error, refetch, fetchMore: handleFetchMore };
};
export default useRepository;