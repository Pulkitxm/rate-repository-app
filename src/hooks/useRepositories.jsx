import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = (orderBy, orderDirection, searchKeyword) => {
    const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
        variables: { orderBy, orderDirection, searchKeyword },
        fetchPolicy: 'cache-and-network'
    });
    const [repositories, setRepositories] = useState([]);
    useEffect(() => {
        if (data && data.repositories && data.repositories.edges) {
            setRepositories(data.repositories.edges.map(i => i.node));
        }
    }, [data]);
    return { repositories, loading, error, refetch };
};
export default useRepositories;