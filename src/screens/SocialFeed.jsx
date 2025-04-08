import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React from 'react'

const SocialFeed = () => {
    const posts = [
        {
            id: 1,
            user: 'suyog',
            title: 'Post Title',
            image: 'https://images.unsplash.com/photo-1741851374430-d242e0dcd70c?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 2,
            user: 'suyog',
            title: 'Post Title 2',
            image: 'https://images.unsplash.com/photo-1741851374430-d242e0dcd70c?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 3,
            user: 'suyog',
            title: 'Post Title 2',
            image: 'https://images.unsplash.com/photo-1741851374430-d242e0dcd70c?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
    ]
    
    return (
        <View style={feedStyle.mainContainer}>
            <Text style={feedStyle.pageHeader}>Social App</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={feedStyle.postCard}>
                        <View style={feedStyle.postHeader}>
                            <Text>{item.user}</Text>
                        </View>
                        <Text>{item.title}</Text>
                        <Image source={{uri: item.image}} style={feedStyle.postImg} />
                    </View>
                )}
                contentContainerStyle={feedStyle.postListContainer}
            />
        </View>
    )
}

const feedStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)'
    },
    pageHeader: {
        padding: 20,
        fontSize: 32,
        fontWeight: 'bold'
    },
    postListContainer: {
        paddingHorizontal: 20
    },
    postCard: {
        backgroundColor: 'white',
        // marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden'
    },
    postHeader: {
        padding: 15
    },
    postImg: {
        width: '100%',
        height: 200
    }
})

export default SocialFeed