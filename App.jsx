import React, { useEffect, useState } from 'react'
import { AuthProvider } from './src/context/AuthContext'
import LoginScreen from './src/screens/AuthScreens/LoginScreen'
import RegisterScreen from './src/screens/AuthScreens/RegisterScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainApp from './src/components/MainApp'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
    <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
)

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='MainApp' component={MainApp} options={{ headerShown: false }} />
  </Stack.Navigator>
)

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = auth().onAuthStateChanged(async (user) => {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user._user))
        setUser(user)
      } else {
        await AsyncStorage.removeItem('user')
        setUser(null)
      }
      setLoading(false)
    })
    return checkLogin
  }, [])

  useEffect(() => {
    const checkUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Failed to load user from storage', error)
      } finally {
        setLoading(false)
      }
    }

    checkUserFromStorage()
  }, [])

  if (loading) return null

  return (
    <AuthProvider>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App
