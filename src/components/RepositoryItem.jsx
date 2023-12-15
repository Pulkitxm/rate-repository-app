import React from 'react'
import { View, Text } from 'react-native'
const RepositoryItem = ({ item }) => {
    return (
        <View style={{paddingLeft:7,paddingRight:7}}>
            <Text>
                Full name: {item.fullName}
            </Text>
            <Text>
                Description: {item.description}
            </Text>
            <Text>
                Language: {item.language}
            </Text>
            <Text>
                ForksCount: {item.forksCount}
            </Text>
            <Text>
                StargazersCount: {item.stargazersCount}
            </Text>
            <Text>
                RatingAverage: {item.ratingAverage}
            </Text>
            <Text>
                ReviewCount: {item.reviewCount}
            </Text>
            <Text>
                OwnerAvatarUrl: {item.ownerAvatarUrl}
            </Text>
        </View>
    )
}

export default RepositoryItem;