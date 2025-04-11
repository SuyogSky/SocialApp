import firestore from "@react-native-firebase/firestore";

export const addPost = async (postDetails) => {
    try {
        await firestore().collection('posts').add(postDetails)
    } catch (error) {
        console.log('Error adding post: ', error)
    }
}

export const getPosts = async () => {
    try {
        const postDetails = await firestore().collection('posts').get()
        const posts = postDetails.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        return posts
    } catch (error) {
        console.log('Error fetching post: ', error)
    }
}