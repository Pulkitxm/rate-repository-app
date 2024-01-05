import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
const useRepository = (id) => {
    const { data, loading, error, refetch } = useQuery(GET_REPOSITORY, {
        variables: { repositoryId:id },
        fetchPolicy: 'cache-and-network'
    });
    return { data, loading, error, refetch };
};
export default useRepository;