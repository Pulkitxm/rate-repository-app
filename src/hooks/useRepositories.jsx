import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = (variables) => {
    const { data, loading, error, refetch, fetchMore } = useQuery(GET_REPOSITORIES, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
    const [repositories, setRepositories] = useState([]);

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }
        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };
    
    useEffect(() => {
        if (data && data.repositories && data.repositories.edges) {
            setRepositories(data.repositories.edges.map(i => i.node));
        }
    }, [data]);
    return { repositories, loading, error, refetch, fetchMore: handleFetchMore };
};
export default useRepositories;