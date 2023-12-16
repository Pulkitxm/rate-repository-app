import { View, StyleSheet, Text, Pressable } from 'react-native';

import Styles from '../../theme'

const styles = StyleSheet.create({
    appBarTab: {
        color: Styles.colors.appBarText,
        padding: 20,
        fontSize: 25,
        fontWeight: Styles.colors.appBarTextWeight,
    }
});

const AppBarTab = ({ title }) => {
    return <Text style={styles.appBarTab}>
            {title}
    </Text>
};

export default AppBarTab;