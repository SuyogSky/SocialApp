import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null)

    const loginUser = async (email, password) => {
        try {
            const userDetails = await auth().signInWithEmailAndPassword(email, password)
            const user = userDetails.user
            return user
        } catch (error) {
            throw new Error(error.code)
        }
    }

    const registerUser = async (email, password) => {
        try {
            const userCredentials = await auth().createUserWithEmailAndPassword(email, password)
            console.log(userCredentials)
            return userCredentials
        } catch (error) {
            throw new Error(error.code)
        }
    }

    const logout = async () => {
        try {
            await auth().signOut()
            Alert.alert('Success', `User is loggout.`)
        } catch (error) {
            throw new Error(error.code)
        }
    }

    useEffect(() => {
        const authState = auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedInUser(user)
            }
        })
        return authState
    }, [])

    const contextData = {
        loggedInUser,
        loginUser,
        registerUser,
        logout
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}