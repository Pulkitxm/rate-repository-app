import { FlatList, View, Text, StyleSheet, Pressable, Button } from 'react-native';
import RepositoryItem from './RepositoryItem'
import Loader from './Loader'
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import SortMenu from './SortMenu';
import Search from './Search';
import uuid from 'react-native-uuid';
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

export const RepositoryListContainer = ({ repositories, onEndReach, showLoader }) => {
    return <>
        <FlatList
            data={repositories}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => {
                return (
                    <RepositoryItem
                        key={index}
                        item={item}
                        isSingle={false}
                        index={index}
                        isLast={index == repositories.length - 1}
                    />
                )
            }}
        />
        {
            showLoader && <>
                <View style={{ height: 20 }} ></View>
                <Loader />
                <View style={{ height: 20 }} ></View>
            </>
        }
    </>
}

const ShowRepositories = ({ value, setValue }) => {
    const [search, setSearch] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [showLoader, setshowLoader] = useState()
    const { repositories, loading, fetchMore } = useRepositories({
        orderBy: value == "Latest repositories" ? "CREATED_AT" : value == "Highest rated repositories" ? "RATING_AVERAGE" : value == "Lowest rated repositories" ? "RATING_AVERAGE" : "",
        orderDirection: value == "Latest repositories" ? "DESC" : value == "Highest rated repositories" ? "DESC" : value == "Lowest rated repositories" ? "ASC" : "",
        searchKeyword: searchVal,
        first: 4
    });
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <Loader text={"loading respositories..."} />
            </View>
        );
    }
    const onEndReach = () => {
        console.log('You have reached the end of the list');
        setshowLoader(true)
        setTimeout(() => {
            fetchMore()
            setshowLoader(false)
        },2000)
    };
    return <>
        <Search search={search} setSearch={setSearch} searchVal={searchVal} setSearchVal={setSearchVal} />
        <SortMenu value={value} setValue={setValue} />
        <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} showLoader={showLoader} />
    </>
}

export const RepositoryContainer = ({ id }) => {
    const { data, loading, refetch } = useRepository(id);
    if (loading) {
        return <View style={styles.loaderContainer}>
            <Loader text={"loading respository..."} />
        </View>
    }
    const repo = {
        id: data.repository.id,
        url: data.repository.url,
        fullName: data.repository.fullName,
        description: data.repository.description,
        language: data.repository.language,
        forksCount: data.repository.forksCount,
        stargazersCount: data.repository.stargazersCount,
        ratingAverage: data.repository.ratingAverage,
        reviewCount: data.repository.reviewCount,
        ownerAvatarUrl: data.repository.ownerAvatarUrl,
    }
    repo.reviews = data.repository.reviews.edges.map(i => {
        let j = i.node
        j = {
            ...j,
            user: j.user.username
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
    const [value, setValue] = useState("Latest repositories");
    if (params && params.id) {
        const ID = params.id
        return <RepositoryContainer id={ID} />
    } else {
        return <ShowRepositories value={value} setValue={setValue} />
    }
};

export default RepositoryList;
