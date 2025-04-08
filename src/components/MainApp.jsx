import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import SocialFeed from '../screens/SocialFeed'
import Profile from '../screens/Profile'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const MainApp = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={{tabBarIcon: ({color}) => (<FontAwesome name='home' size={24} color={color}/>)}} />
        <Tab.Screen name='Feed' component={SocialFeed} options={{tabBarIcon: ({color}) => (<MaterialIcons name='dynamic-feed' size={24} color={color}/>)}} />
        <Tab.Screen name='Profile' component={Profile} options={{tabBarIcon: ({color}) => (<Ionicons name='person' size={24} color={color}/>)}} />
    </Tab.Navigator>
  )
}

export default MainApp