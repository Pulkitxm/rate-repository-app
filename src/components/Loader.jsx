import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const CustomLoader = ({ text = 'Loading...' }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default CustomLoader;
