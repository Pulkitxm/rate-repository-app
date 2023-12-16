import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab'

import Styles from '../../theme'

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        width:'100%',
        backgroundColor: Styles.colors.appBarBg,
        marginBottom: 10,
        display: 'flex',
        flexDirection: "row",
    },
});

const AppBar = () => {
    return <View style={styles.container}>
        <AppBarTab title={"Repositories"}/>
    </View>;
};

export default AppBar;