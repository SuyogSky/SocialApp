import { View, Text, Modal, Touchable, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { authForm } from '../styles/AuthForm'
import { addPost } from '../firestore/posts'

const AddPostForm = ({ showAddPostForm, setShowAddPostForm }) => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [btnLoading, setBtnLoading] = useState(false)

    const handleAddPost = async () => {
        setBtnLoading(true)
        if (!title || !image) {
            Alert.alert('Warning', 'Please fill all the fields.')
            return
        }
        else {
            try {
                await addPost({ title, image })
                Alert.alert('Success', 'Post added successfully.')
                setImage('')
                setTitle('')
                setShowAddPostForm(false)
            } catch (error) {
                console.log('Error adding post: ', error)
            }
        }
        setBtnLoading(false)
    }
    return (
        <Modal
            visible={showAddPostForm}
            transparent={true}
        >
            <View style={addPostForm.mainContainer}>
                <View style={addPostForm.formContainer}>
                    <Text style={addPostForm.heading}>Add Post Form</Text>

                    <TextInput Title
                        placeholder='Title'
                        value={title}
                        onChangeText={setTitle}
                        style={addPostForm.inputField}
                    />
                    <TextInput
                        placeholder='Image'
                        value={image}
                        onChangeText={setImage}
                        style={addPostForm.inputField}
                    />
                    {btnLoading
                        ?
                        <TouchableOpacity style={[authForm.button, { padding: 10, backgroundColor: 'blue' }]}>
                            <Text style={[authForm.btnText, { fontSize: 18, color: 'white' }]}>Loading..</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={handleAddPost} style={[authForm.button, { padding: 10, backgroundColor: 'blue' }]}>
                            <Text style={[authForm.btnText, { fontSize: 18, color: 'white' }]}>Add Post</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={() => setShowAddPostForm(false)} style={[authForm.button, { padding: 10, backgroundColor: 'red' }]}>
                        <Text style={[authForm.btnText, { fontSize: 18, color: 'white' }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const addPostForm = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    formContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20
    },
    heading: {
        fontSize: 32,
        color: 'blue',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center'
    },
    inputField: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 15,
        marginBottom: 15
    }
})

export default AddPostForm