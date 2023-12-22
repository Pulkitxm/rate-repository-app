import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab'

import Styles from '../../theme'

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        width:'100%',
        backgroundColor: Styles.colors.appBarBg,
        display: 'flex',
        flexDirection: "row",
        justifyContent:"space-between"
    },
});

const AppBar = () => {
    return <View style={styles.container}>
        <AppBarTab title={"Repositories"} url="/"/>
        <AppBarTab title={"Sign-in/up"} url="/signin"/>
    </View>;
};

export default AppBar;