import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AddPost from '../components/AddPost'
import AddPostForm from '../components/AddPostForm'

const Home = () => {
  const [showAddPostForm, setShowAddPostForm] = useState(false)

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <Text>Home</Text>
      <AddPost showAddPostForm={setShowAddPostForm} />
      <AddPostForm showAddPostForm={showAddPostForm} setShowAddPostForm={setShowAddPostForm} />
    </View>
  )
}

export default Home