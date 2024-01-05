import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Loader from './Loader'
const searchSvgData = `
  <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
const cancelSvgData = `
  <svg width="800px" height="800px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"/>
  </svg>
`;
const SearchIcon = () => {
  return <SvgXml xml={searchSvgData} width="25" height="25" />;
};
const CancelIcon = () => {
  return <SvgXml xml={cancelSvgData} width="40" height="40" />;
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: "90%",
    padding: 10,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  input: {
    width: "80%",
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  }
})

const Search = ({ search, setSearch, searchVal, setSearchVal }) => {
  const [showLoader, setShowLoader] = useState(false)
  return (
    <View style={styles.container} >
      {
        showLoader ?
          <Loader onlyLoader={true} />
          :
          <Pressable onPress={() => {
            setShowLoader(true)
            setTimeout(() => { 
              setShowLoader(false)
              setSearchVal(search)
            },1500)
          }} >
            <SearchIcon />
          </Pressable>
      }
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setSearch(text);
        }}
        value={search}
      />
      <Pressable onPress={() => {
        setSearch("")
        setSearchVal("")
      }} >
        <CancelIcon />
      </Pressable>
      {/* add here the rolling circle */}
    </View>
  );
};

export default Search;
