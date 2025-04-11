import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from '../context/AuthContext'
import firestore from '@react-native-firebase/firestore'
import CommentsPopup from './CommentPopup'

const PostCard = ({ item }) => {
    const [showComment, setShowComment] = useState(false)
    const [likes, setLikes] = useState(item.likes || [])
    const [commentCount, setCommentCount] = useState(0)
    const [currentUser, setCurrentUser] = useState(null)
    const { getLoggedInUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getLoggedInUser()
                if (user) setCurrentUser(user)
            } catch (err) {
                console.error('Error fetching user:', err)
            }
        }
        fetchUser()
    }, [])

    // Real-time listener for comments count
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('posts')
            .doc(item.id)
            .collection('comments')
            .onSnapshot(snapshot => {
                setCommentCount(snapshot.size)
            })

        return () => unsubscribe()
    }, [item.id])

    const isLiked = currentUser ? likes.includes(currentUser.email) : false

    const toggleLike = async () => {
        if (!currentUser) return
        const postRef = firestore().collection('posts').doc(item.id)

        const isCurrentlyLiked = likes.includes(currentUser.email)
        try {
            await postRef.update({
                likes: isCurrentlyLiked
                    ? firestore.FieldValue.arrayRemove(currentUser.email)
                    : firestore.FieldValue.arrayUnion(currentUser.email)
            })

            setLikes(prev =>
                isCurrentlyLiked
                    ? prev.filter(email => email !== currentUser.email)
                    : [...prev, currentUser.email]
            )
        } catch (err) {
            console.error('Error liking/unliking post:', err)
        }
    }

    if (!currentUser) return null;

    return (
        <View style={feedStyle.postCard}>
            <View style={feedStyle.postHeader}>
                <Text>{item.user}</Text>
            </View>
            <Text>{item.title}</Text>
            <Image source={{ uri: item.image }} style={feedStyle.postImg} />
            <View style={feedStyle.actionContainer}>
                <TouchableOpacity style={feedStyle.actionBth} onPress={toggleLike}>
                    <AntDesign name={isLiked ? 'heart' : 'hearto'} size={24} color={isLiked ? 'red' : 'black'} />
                    <Text>{likes.length}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={feedStyle.actionBth} onPress={() => setShowComment(true)}>
                    <FontAwesome name='comment-o' size={24} color='black' />
                    <Text>{commentCount}</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={showComment} transparent={true}>
                <CommentsPopup postId={item.id} setShowComment={setShowComment} />
            </Modal>
        </View>
    )
}

const feedStyle = StyleSheet.create({
    postCard: {
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden'
    },
    postHeader: {
        padding: 15
    },
    postImg: {
        width: '100%',
        height: 200
    },
    actionContainer: {
        flexDirection: 'row',
    },
    actionBth: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        flexDirection: 'row',
        gap: 10
    }
})

export default PostCard
