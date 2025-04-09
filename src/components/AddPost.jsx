import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const AddPost = ({ showAddPostForm }) => {
  return (
    <TouchableOpacity style={addPostBtn.addBtn} onPress={() => showAddPostForm(true)}>
      <Text style={addPostBtn.btnTxt}>+</Text>
    </TouchableOpacity>
  )
}

const addPostBtn = StyleSheet.create({
    addBtn: {
        width: 50,
        height: 50,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    btnTxt: {
        fontSize: 24,
        color: 'white'
    }
})

export default AddPost