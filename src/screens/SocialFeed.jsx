import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddPost from '../components/AddPost'
import AddPostForm from '../components/AddPostForm'
import { getPosts } from '../firestore/posts'
import PostCard from '../components/PostCard'

const SocialFeed = () => {
    const [posts, setPosts] = useState([])

    const fetchPost = async () => {
        try {
            const fetchedPosts = await getPosts()
            setPosts(fetchedPosts)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

      const [showAddPostForm, setShowAddPostForm] = useState(false)
    

    return (
        <View style={feedStyle.mainContainer}>
            <Text style={feedStyle.pageHeader}>Social App</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PostCard item={item} />
                )}
                contentContainerStyle={feedStyle.postListContainer}
            />

            <AddPost showAddPostForm={setShowAddPostForm} />
            <AddPostForm showAddPostForm={showAddPostForm} setShowAddPostForm={setShowAddPostForm} />
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
    }
})

export default SocialFeed