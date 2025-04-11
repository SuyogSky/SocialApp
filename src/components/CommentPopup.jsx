import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import firestore from '@react-native-firebase/firestore'
import Comment from './Comment'
import { AuthContext } from '../context/AuthContext'

const CommentsPopup = ({ setShowComment, postId }) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const { getLoggedInUser } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getLoggedInUser()
            setCurrentUser(user)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('createdAt', 'asc')
            .onSnapshot(snapshot => {
                const commentList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setComments(commentList)
            })

        return () => unsubscribe()
    }, [postId])

    const handleAddComment = async () => {
        if (newComment.trim() === '' || !currentUser) return

        try {
            await firestore()
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .add({
                    user: currentUser.email,
                    comment: newComment.trim(),
                    createdAt: firestore.FieldValue.serverTimestamp()
                })

            setNewComment('')
        } catch (error) {
            console.error('Error adding comment: ', error)
        }
    }

    return (
        <View style={commentsStyle.mainContainer}>
            <KeyboardAvoidingView
                style={commentsStyle.commentsContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={commentsStyle.commentHeading}>
                    <Text style={commentsStyle.headingText}>Comments</Text>
                    <TouchableOpacity onPress={() => setShowComment(false)}>
                        <Entypo size={32} name='cross' />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Comment user={item.user} commentTxt={item.comment} />
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />

                <View style={commentsStyle.addCommentContainer}>
                    <TextInput
                        placeholder="Add a comment..."
                        value={newComment}
                        onChangeText={setNewComment}
                        style={commentsStyle.input}
                        multiline
                    />
                    <TouchableOpacity onPress={handleAddComment} style={commentsStyle.sendBtn}>
                        <Entypo name="paper-plane" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const commentsStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end'
    },
    commentsContainer: {
        height: '70%',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: 'white',
        paddingBottom: 20
    },
    commentHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
    },
    headingText: {
        fontSize: 24
    },
    addCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        marginRight: 10,
        maxHeight: 100
    },
    sendBtn: {
        backgroundColor: '#04ba80',
        padding: 10,
        borderRadius: 30
    }
})

export default CommentsPopup
