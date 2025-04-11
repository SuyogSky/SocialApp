import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            await AsyncStorage.removeItem('user')
            Alert.alert('Success', `User is loggout.`)
        } catch (error) {
            throw new Error(error.code)
        }
    }

    const getLoggedInUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                return JSON.parse(user);
            }
            return null;
        } catch (error) {
            console.error("Error getting user:", error);
            return null;
        }
    };

    const contextData = {
        loggedInUser,
        loginUser,
        registerUser,
        logout,
        getLoggedInUser,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}