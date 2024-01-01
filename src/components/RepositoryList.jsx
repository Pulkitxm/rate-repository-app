import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
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

const RepositoryList = ({ repositories, loading }) => {

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <Loader text={"loading respositories..."} />
            </View>
        );
    }

    return (
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
    );
};

export default RepositoryList;
