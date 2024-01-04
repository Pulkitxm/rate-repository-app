import { FlatList, View, Text, StyleSheet, Pressable, Button } from 'react-native';
import RepositoryItem from './RepositoryItem'
import Loader from './Loader'
import { Link, useParams } from 'react-router-native';
import { collectFields } from 'graphql/execution/execute';
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
            renderItem={({ item,index }) => (
                <RepositoryItem
                    key={item.id}
                    item={item}
                    isSingle={false}
                    index={index}
                />
            )}
        />
}

const RepositoryList = ({ repositories, loading, refetch }) => {
    const params = useParams()
    if (params && params.id) {
        const id = params.id
        return <RepositoryItem
            key={id}
            item={repositories[id-1]}
            isSingle={true}
            index={id}
        />
    }
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <Loader text={"loading respositories..."} />
            </View>
        );
    }
    return (
        <>
            {/* <Button title="Click me" onPress={() => refetch()} /> */}
            <RepositoryListContainer repositories={repositories} />
        </>
    );
};

export default RepositoryList;
