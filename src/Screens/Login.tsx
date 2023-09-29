import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
import { login, onAuthentication } from '../API/auth'
import { storeData } from '../API/localStorage'
import * as LocalAuthentication from 'expo-local-authentication'


export default function Login({navigation}: any) {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address')
            return;
        }
        if (!password || password.length < 8) {
            alert('Password must be at least 8 characters')
            return;
        }
        const res = await login({email: email.toLowerCase(), password})
        await storeData('accessToken', res.accessToken);
        navigation.navigate("Home")
    }

    useEffect(() => {
        (async () => {
            const compatable = await LocalAuthentication.hasHardwareAsync()
            setIsBiometricSupported(compatable)
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                style={styles.loginField} 
                placeholder='email'
                value={email}
                onChangeText={text => setEmail(text)}
                />
            <TextInput 
                style={styles.loginField} 
                placeholder='password' 
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button 
                color='blue'
                title='Login'
                onPress={onAuthentication}
            />
            <Button 
                color='blue'
                title='Sign Up Here'
                onPress={() => navigation.navigate("Register")}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginField: {
        height: 40,
        width: 240,
        borderWidth: 2,
        borderColor: "grey",
        minWidth: 200,
        textAlign: "center",
        paddingLeft: 10,
        borderRadius: 20,
        color: "black",
        marginBottom: 20
    },
    button: {
        borderWidth: 2,
        borderColor: "grey",
        borderRadius: 20,
        width: 240,
        backgroundColor: "blue",
        color: 'black'
    }
});
