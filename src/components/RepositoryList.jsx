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
            <FlatList
                data={repositories}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item, index, separators }) => (
                    <RepositoryItem
                        key={item.id}
                        item={item}
                    />
                )}
            />
        </>
    );
};

export default RepositoryList;
