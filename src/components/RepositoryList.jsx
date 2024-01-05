import { FlatList, View, Text, StyleSheet, Pressable, Button } from 'react-native';
import RepositoryItem from './RepositoryItem'
import Loader from './Loader'
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import useRepositories from '../hooks/useRepositories';
const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
    return <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index }) => (
            <RepositoryItem
                key={item.id}
                item={item}
                isSingle={false}
                index={index}
            />
        )}
    />
}

const ShowRepositories = () => {
    const { repositories, loading, refetch } = useRepositories();
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <Loader text={"loading respositories..."} />
            </View>
        );
    }
    return <RepositoryListContainer repositories={repositories} />
}

export const RepositoryContainer = ({ id }) => {
    const { data, loading, refetch } = useRepository(id);
    if(loading){
        return <View style={styles.loaderContainer}>
            <Loader text={"loading respository..."} />
        </View> 
    }
    const repo = {
        id:data.repository.id,
        url:data.repository.url,
        fullName:data.repository.fullName,
        description:data.repository.description,
        language:data.repository.language,
        forksCount:data.repository.forksCount,
        stargazersCount:data.repository.stargazersCount,
        ratingAverage:data.repository.ratingAverage,
        reviewCount:data.repository.reviewCount,
        ownerAvatarUrl:data.repository.ownerAvatarUrl,
    }
    repo.reviews = data.repository.reviews.edges.map(i => {
        let j = i.node
        j =  {
            ...j,
            user:j.user.username
        }
        delete j["__typename"]
        delete j["userId"]
        return j
    })
    return <>
        <RepositoryItem
            item={repo}
            isSingle={true}
        />
    </>
}

const RepositoryList = () => {
    const params = useParams()
    if (params && params.id) {
        const ID = params.id
        return <RepositoryContainer id={ID} />
    } else {
        return <ShowRepositories />
    }
};

export default RepositoryList;
