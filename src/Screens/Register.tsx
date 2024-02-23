import { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Text, Button } from 'react-native';
import { register } from '../API/requests';

export default function Register ({ navigation }: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address')
        }
        if (!password || password.length < 8) {
            alert('Password must be at least 8 characters')
        }
        const res = await register(email, password)
        if (res.ok === true) {
            navigation.navigate("Home")
        }
        else {
            alert(res.message)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                style={styles.loginField} 
                placeholder='email'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput 
                textContentType='newPassword' 
                style={styles.loginField} 
                placeholder='password'
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button 
                color='blue'
                title='Sign Up'
                onPress={handleRegister}
            />
            <View style={[styles.fixToText, styles.bottom]}>
                <Text>Already have an account with us? </Text>
                <Button 
                    color='blue'
                    title='Login'
                    onPress={() => navigation.navigate("Login")}
                />
            </View>
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
    },
    fixToText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
    },
    bottom: {
        bottom: -200
    }
});
