import { FlatList, View, Text, StyleSheet, Pressable, Button } from 'react-native';
import RepositoryItem from './RepositoryItem'
import Loader from './Loader'
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
        renderItem={({ item}) => (
            <RepositoryItem
                key={item.id}
                item={item}
            />
        )}
    />
}

const RepositoryList = ({ repositories, loading, refetch }) => {
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
