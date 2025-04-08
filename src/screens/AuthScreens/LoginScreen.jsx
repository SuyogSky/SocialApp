import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { authForm } from '../../styles/AuthForm'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {loginUser} = useContext(AuthContext)

    const handleLogin = async () => {
        if (!email || !password){
            Alert.alert('Warning', 'Please fill all the fields.')
        }
        else{
            try {
                const user = await loginUser(email, password)
            } catch (error) {
                Alert.alert('Error', error.message)
            }
        }
    }
    return (
        <View style={authForm.mainContainer}>
            <Text style={authForm.welcome}>Hello!</Text>
            <Text style={authForm.welcome}>Welcome Back</Text>
            <View style={authForm.formContainer}>
                <Text style={authForm.heading}>Login Form</Text>
                <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                    style={authForm.formFields}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={authForm.formFields}
                />
                <Text style={authForm.link}>Forgot Password</Text>
                <TouchableOpacity style={authForm.button} onPress={handleLogin} >
                    <Text style={authForm.btnText}>Login</Text>
                </TouchableOpacity>
                <Text style={authForm.text}>Do not have an account? <Text style={authForm.link} onPress={() => navigation.navigate('Register')}>Register</Text></Text>
            </View>
        </View>
    )
}

export default LoginScreen