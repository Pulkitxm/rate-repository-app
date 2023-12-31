import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'
import { useEffect, useState } from 'react';
const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

    const [repositories, setRepositories] = useState()

    const fetchRepositories = async () => {
        const response = await fetch('http://192.168.1.7:5000/api/repositories')
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
    };
    useEffect(() => {
        fetchRepositories();
    }, []);
    return (
        <FlatList
            data={repositories}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item, index, separators }) => (
                <RepositoryItem
                    key={index}
                    item={item}
                />
            )}
        />
    );
};

export default RepositoryList;