import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab'

import Styles from '../../theme'

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Styles.colors.appBarBg,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
    },
});

const AppBar = () => {
    return (<View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab title={"Repositories"} url="/" />
                <AppBarTab title={"Sign-in/up"} url="/signin" />
            </ScrollView>
        </View>);
};

export default AppBar;