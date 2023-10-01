import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Button, Switch, Text } from 'react-native';
import { login, onAuthentication, onVerifyBiometrics } from '../API/auth'
import { retrieveData, storeData } from '../API/localStorage'
import * as SecureStore from 'expo-secure-store'

type Props = {
    navigation: any;
}


export default function Login({navigation}: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [useFaceID, setUseFaceID] = useState(false);

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
        if (res.ok === true) {
            await storeData('accessToken', res.accessToken);
            if (useFaceID === true ) {
                if (await onAuthentication()) {
                    await SecureStore.setItemAsync("ht-user-email", email.toLowerCase());
                    await SecureStore.setItemAsync("ht-user-password", password)
                } else {
                    await storeData('useFaceID', false);
                }
                navigation.navigate("Home")
            } else if (useFaceID === false) {
                navigation.navigate("Home")
            }

        }
    }

    useEffect(() => {
        (async () => {
            const shouldUseFaceID: boolean = await retrieveData('useFaceID', true);
            setUseFaceID(shouldUseFaceID)
            if (shouldUseFaceID) {
                const isEnabled = await onVerifyBiometrics()
                if (isEnabled) {
                    const success = await onAuthentication();
                    if (success) {
                        const email = await SecureStore.getItemAsync("ht-user-email");
                        const password = await SecureStore.getItemAsync("ht-user-password");
                        const res = await login({email: email as string, password: password as string})
                        if (res.ok === true) {
                            await storeData('accessToken', res.accessToken)
                            navigation.navigate('Home')
                        }
                    }
                }
            }
        })();
    }, []);

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
                onPress={handleLogin}
                />
            <View style={styles.fixToText}>
                <Text style={{paddingRight: 20}}>Enable FaceID</Text>
                <Switch 
                    value={useFaceID}
                    onChange={async () => {
                        const isEnabled = await onVerifyBiometrics()
                        if (isEnabled) {
                            let prevValue;
                            setUseFaceID(prev => {
                                prevValue = !prev
                                return prevValue
                            });
                            await storeData('useFaceID', prevValue);
                        }
                    }}
                />
            </View>
            <View style={[styles.fixToText, styles.bottom]}> 
                <Text>Don't have an account? </Text>
                <Button 
                    color='blue'
                    title='Sign Up'
                    onPress={() => navigation.navigate("Register")}
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
