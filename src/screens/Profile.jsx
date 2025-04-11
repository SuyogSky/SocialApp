import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { authForm } from '../styles/AuthForm'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
    const { getLoggedInUser, logout } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getLoggedInUser()
                if (user) {
                    setCurrentUser(user)
                }
            } catch (err) {
                console.error('Failed to fetch user:', err)
            }
        }

        fetchUser()
    }, [])


    return (
        <View>
            <Image
                source={{ uri: 'https://tse2.mm.bing.net/th/id/OIP.jQvFuRlmVesA7K6ArjfyrAHaH9?rs=1&pid=ImgDetMain' }}
                style={{ width: 200, height: 200 }}
            />
            <Text>{currentUser?.email}</Text>
            <TouchableOpacity style={[authForm.button, { margin: 20, padding: 10, backgroundColor: 'red' }]} onPress={logout}>
                <Text style={[authForm.btnText, { fontSize: 18, color: 'white' }]}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile