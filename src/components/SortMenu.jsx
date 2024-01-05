import {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 999,
        backgroundColor: 'white',
    },
});

const SortMenu = ({value,setValue}) => {
    console.log(value);
    return (
        <Picker
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) =>
                setValue(itemValue)
            }>
            <Picker.Item label="Latest repositories " value="Latest repositories" />
            <Picker.Item label="Highest rated repositories" value="Highest rated repositories" />
            <Picker.Item label="Lowest rated repositories" value="Lowest rated repositories" />
        </Picker>
    );
};

export default SortMenu;