import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Comment = ({user, commentTxt}) => {
  return (
    <View style={comment.commentContainer}>
      <Text style={comment.commentor}>{user}</Text>
      <Text style={comment.commentContent}>{commentTxt}</Text>
    </View>
  )
}

const comment = StyleSheet.create({
    commentContainer: {
        padding: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3
    },
    commentor: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    commentContent: {
        fontSize: 16,
    }
})
export default Comment