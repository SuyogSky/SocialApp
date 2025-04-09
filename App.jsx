import React, { useEffect, useState } from 'react'
import { AuthProvider } from './src/context/AuthContext'
import LoginScreen from './src/screens/AuthScreens/LoginScreen'
import RegisterScreen from './src/screens/AuthScreens/RegisterScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainApp from './src/components/MainApp'
import { getAuth } from '@react-native-firebase/auth'

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
  useEffect(() => {
    const authState = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      }
    })
    return authState
  }, [])
  return (
    <AuthProvider>
      <NavigationContainer>
          {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App