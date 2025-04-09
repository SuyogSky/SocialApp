import firestore from "@react-native-firebase/firestore";

export const addPost = async (postDetails) => {
    try {
        await firestore().collection('posts').add(postDetails)
    } catch (error) {
        console.log('Error adding post: ', error)
    }
}