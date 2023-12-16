import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import theme from '../../theme'

const styles = StyleSheet.create({
    tab: {
        display: "flex",
        padding: 10,
        backgroundColor: "#fff",
        marginBottom:10,
    },
    avatar: {
        width: 56,
        height: 58,
        borderRadius: 10,
    },
    top: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        width:"87%"
    },
    mid: {
        display: "flex",
        justifyContent: "center",
        flexDirection:"row",
        alignContent: "center",
        marginTop:10,
        marginBottom:10,
    },
    language: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: theme.colors.primary,
        width:100,
        height: 40,
        borderRadius:10
    },
    bottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    botTab: {
        display: "flex",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
});

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.tab}>
            <View style={styles.top}>
                <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl}}/>
                <View>
                    <Text style={{fontWeight:"900",fontSize:20}} >{item.fullName} </Text>
                    <Text style={{ opacity: .7, width: 200, marginTop:10, fontSize: 13 }}>{item.description}</Text>
                </View>
            </View>
            <View style={styles.mid}>
                <View style={styles.language}>
                    <Text style={{ color: "#fff", fontSize: 18 }} >{item.language}</Text>
                </View>
            </View>
            <View style={styles.bottom}>                
                <View style={styles.botTab} >
                    <Text style={{fontWeight:900,fontSize:17,opacity:.7}} >{item.stargazersCount}</Text>
                    <Text style={{fontSize:17,opacity:.7}} >Stars</Text>
                </View>
                <View style={styles.botTab} >
                    <Text style={{fontWeight:900,fontSize:17,opacity:.7}} >{item.forksCount}</Text>
                    <Text style={{fontSize:17,opacity:.7}} >Forks</Text>
                </View>
                <View style={styles.botTab} >
                    <Text style={{fontWeight:900,fontSize:17,opacity:.7}} >{item.reviewCount}</Text>
                    <Text style={{fontSize:17,opacity:.7}} >Reviews</Text>
                </View>
                <View style={styles.botTab} >
                    <Text style={{fontWeight:900,fontSize:17,opacity:.7}} >{item.ratingAverage}</Text>
                    <Text style={{fontSize:17,opacity:.7}} >Ratings</Text>
                </View>
            </View>
        </View>
    )
}

export default RepositoryItem;