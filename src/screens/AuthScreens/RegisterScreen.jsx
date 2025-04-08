import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { authForm } from '../../styles/AuthForm'

const RegisterScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {registerUser} = useContext(AuthContext)

    const handleRegister = async () => {
        if(!userName || !email || !password || !confirmPassword){
            Alert.alert('Warning', 'Please fill all the fields.')
        }
        else if(password !== confirmPassword){
            Alert.alert('Warning', 'Password did not matched.')
        }
        else{
            try {
                await registerUser(email, password)
                Alert.alert('Success', 'User registered successfully.')
            } catch (error) {
                Alert.alert('Error', error.message)
            }
        }
    }
    return (
        <View style={authForm.mainContainer}>
            <Text style={authForm.welcome}>Welcome!</Text>
            <Text style={authForm.welcome}>To Our Social App</Text>
            <View style={authForm.formContainer}>
                <Text style={authForm.heading}>Register Form</Text>
                <TextInput
                    placeholder='User Name'
                    value={userName}
                    onChangeText={setUserName}
                    style={authForm.formFields}
                />
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
                <TextInput
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                    style={authForm.formFields}
                />
                <TouchableOpacity style={authForm.button} onPress={handleRegister}>
                    <Text style={authForm.btnText}>Register</Text>
                </TouchableOpacity>
                <Text style={authForm.text}>Already have an account? <Text style={authForm.link} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
            </View>
        </View>
    )
}

export default RegisterScreen