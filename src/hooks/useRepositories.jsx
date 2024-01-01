import { useState, useEffect } from 'react';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);

    const fetchRepositories = async () => {
        setLoading(true);
        const url = `http://${process.env.IP}:5000/api/repositories`;
        console.log("fetching response from " + url);
        const response = await fetch(url).then((res) => {
            console.log("response fetched succesfully");
            return res;
        })
        const json = await response.json();
        const data = json.edges.map(a => {
            const i = a.node
            return {
                id: i.id,
                fullName: i.fullName,
                description: i.description,
                language: i.language,
                forksCount: i.forksCount,
                stargazersCount: i.stargazersCount,
                ratingAverage: i.ratingAverage,
                reviewCount: i.reviewCount,
                ownerAvatarUrl: i.ownerAvatarUrl
            }
        })
        setRepositories(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;