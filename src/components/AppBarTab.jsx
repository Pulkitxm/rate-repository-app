import { View, StyleSheet, Text, Pressable } from 'react-native';

import Styles from '../../theme'
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    appBarTab: {
        color: Styles.colors.appBarText,
        padding: 20,
        fontSize: 20,
        fontWeight: Styles.colors.appBarTextWeight,
    }
});

const AppBarTab = ({ title, url }) => {
    return (
        <>
            <Link to={url}>
                <Text style={styles.appBarTab}>
                        {title}
                </Text>
            </Link>
        </>
    )
};

export default AppBarTab;