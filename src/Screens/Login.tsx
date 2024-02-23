import { useState, useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Button, Switch, Text } from 'react-native';
import { onAuthentication, onVerifyBiometrics, useFaceIdOnOpen } from '../Utils/auth'
import { login } from '../API/requests';
import { storeData } from '../Utils/localStorage'
import * as SecureStore from 'expo-secure-store'
import { UserContext } from '../Context/UserContext';

type Props = {
    navigation: any;
}


export default function Login({navigation}: Props) {
    const context = useContext(UserContext);
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [useFaceID, setUseFaceID] = useState<boolean>(false);

    useEffect(() => {
        (async () => useFaceIdOnOpen(context?.user!, context?.setUser!, setUseFaceID, navigation))()
    }, []);

    const handleLogin = async () => {
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address')
            return;
        }
        if (!password || password.length < 8) {
            alert('Password must be at least 8 characters')
            return;
        }
        const res = await login(email.toLowerCase(), password)
        if (res.ok === true) {
            await storeData('accessToken', res.accessToken);
            if (useFaceID === true ) {
                if (await onAuthentication()) {
                    await SecureStore.setItemAsync("ht-user-email", email.toLowerCase());
                    await SecureStore.setItemAsync("ht-user-password", password)
                } else {
                    await storeData('useFaceID', false);
                }
                context?.setUser(prev => ({ 
                    ...prev, 
                    isAuthenticated: true,
                    email: email, 
                    id: res.userID,
                    accessToken: res.accessToken
                }))
                navigation.navigate('App', {screen: 'Home'});
            } else if (useFaceID === false) {
                context?.setUser(prev => ({ 
                    ...prev,
                    isAuthenticated: true,
                    email: email,
                    id: res.userID,
                    accessToken: res.accessToken
                }))
                navigation.navigate('App', {screen: 'Home'});
            }
            
        } else {
            alert(res.message);
        }
    }
    const handleLoginWithFaceID = async () => {
        if (useFaceID === false) {
            alert("Please enable FaceID and login with email and password to use FaceID in future logins");
        } else {
            const success = await onAuthentication()
            if (success === true) {
                const storedEmail = await SecureStore.getItemAsync("ht-user-email");
                const storedPassword = await SecureStore.getItemAsync("ht-user-password");
                const res = await login(storedEmail as string,storedPassword as string)
                if (res.ok === true) {
                    await storeData('accessToken', res.accessToken)
                    context?.setUser(prev => ({ 
                        ...prev, 
                        isAuthenticated: true,
                        email: storedEmail, 
                        id: res.userID,
                        accessToken: res.accessToken
                    }))
                } else {
                    alert(res.message);
                    setEmail('');
                    setPassword('');
                    navigation.navigate('App', {screen: 'Home'});
                }
            } else {
                await storeData('useFaceID', false);
            }
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                textContentType='emailAddress'
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
            <View style={styles.fixToText}>
                <Button 
                    color='blue'
                    title='Login'
                    onPress={handleLogin}
                />
                <Button 
                    color='blue'
                    title='FaceID'
                    onPress={handleLoginWithFaceID}
                />
            </View>
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
                <Text>Don't have an account?</Text>
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
