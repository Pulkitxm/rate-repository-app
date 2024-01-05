import React from 'react'
import { View, Text, Image, StyleSheet, Platform, Button, Pressable, FlatList } from 'react-native'
import { SvgXml } from 'react-native-svg';
import theme from '../../theme'
import { Link, useNavigate } from 'react-router-native';
import * as Linking from 'expo-linking';
import Review from './Review'

const styles = StyleSheet.create({
    tab: {
        display: "flex",
        padding: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
        ...Platform.select({
            android: {
                elevation: 10,
            },
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            default: {
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 1)",

            }
        })
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
        width: "100%"
    },
    mid: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    language: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary,
        width: 100,
        height: 40,
        borderRadius: 10
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
const svgData = `
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
    <path d="M 12 8 L 8 12 L 24.666016 32 L 8 52 L 12 56 L 32 39.333984 L 52 56 L 56 52 L 39.333984 32 L 56 12 L 52 8 L 32 24.666016 L 12 8 z"></path>
  </svg>
`;
const RepositoryItem = ({ item, isSingle,index }) => {
    const navigate = useNavigate()
    return (
        <Pressable style={styles.tab} onPress={() => {
            if (!isSingle) navigate(`/repo/${item.id}`);
        }}>
            <View testID='repositoryItem' >
                <View style={styles.top}>
                    <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
                    <View>
                        <Text style={{ fontWeight: "900", fontSize: 20, width: 220 }} >{item.fullName} </Text>
                        <Text style={{ opacity: .7, width: 200, marginTop: 10, fontSize: 13 }}>{item.description}</Text>
                    </View>
                    {
                        isSingle && <Pressable onPress={() => {
                            navigate("/")
                        }} >
                            <SvgXml xml={svgData} width="30" height="30" />
                        </Pressable>
                    }
                </View>
                <View style={styles.mid}>
                    <View style={styles.language}>
                        <Text style={{ color: "#fff", fontSize: 18 }} >{item.language}</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.botTab} >
                        <Text style={{ fontWeight: 900, fontSize: 17, opacity: .7 }} >{item.stargazersCount}</Text>
                        <Text style={{ fontSize: 17, opacity: .7 }} >Stars</Text>
                    </View>
                    <View style={styles.botTab} >
                        <Text style={{ fontWeight: 900, fontSize: 17, opacity: .7 }} >{item.forksCount}</Text>
                        <Text style={{ fontSize: 17, opacity: .7 }} >Forks</Text>
                    </View>
                    <View style={styles.botTab} >
                        <Text style={{ fontWeight: 900, fontSize: 17, opacity: .7 }} >{item.reviewCount}</Text>
                        <Text style={{ fontSize: 17, opacity: .7 }} >Reviews</Text>
                    </View>
                    <View style={styles.botTab} >
                        <Text style={{ fontWeight: 900, fontSize: 17, opacity: .7 }} >{item.ratingAverage}</Text>
                        <Text style={{ fontSize: 17, opacity: .7 }} >Ratings</Text>
                    </View>
                </View>
                <View>  
                    {
                        isSingle && <Button style={styles.bottom} title='Open in Github' onPress={() => {
                            Linking.openURL(item.url)
                        }} />
                    }
                </View>
                <FlatList
                    style={{...styles.reviews,marginTop:10}}
                    data={item.reviews}
                    renderItem={({ item: review }) => (
                        <Review
                            rating={review.rating}
                            text={review.text}
                            user={review.user}
                            createdAt={review.createdAt}
                        />
                    )}
                    keyExtractor={({ id }) => id}
                />
            </View>
        </Pressable>
    )
}

export default RepositoryItem;