import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab'
import Styles from '../../theme'
import { useApolloClient, useQuery } from '@apollo/client';
import {ME} from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage';
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Styles.colors.appBarBg,
    },
});

const AppBar = () => {
    const { data: meData } = useQuery(ME)
    const apolloClient = useApolloClient()
    const authStorage = useAuthStorage();
    return (<View style={styles.container}>
        <ScrollView horizontal>
            <AppBarTab title={"Repositories"} url="/" />
            {
                meData && meData.me ?
                    <AppBarTab title={"Sign-out"} handlePress={async() => {
                        await authStorage.removeAccessToken()
                        await apolloClient.resetStore();
                    }} />
                    :
                    <AppBarTab title={"Sign-in/up"} url="/signin" />
            }
            {
                meData && meData.me &&
                <AppBarTab title={`Hi ${meData.me.username}!`}/>
            }
        </ScrollView>
    </View>);
};

export default AppBar;