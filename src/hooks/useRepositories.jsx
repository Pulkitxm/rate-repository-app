import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = () => {
    const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'});
    const [repositories, setRepositories] = useState([]);
    useEffect(() => {
        if (data && data.repositories && data.repositories.edges) {
            setRepositories(data.repositories.edges.map(i => i.node));
        }
    }, [data]);
    return { repositories, loading, error, refetch };
};
export default useRepositories;