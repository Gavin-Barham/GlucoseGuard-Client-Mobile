import * as LocalAuthentication from 'expo-local-authentication'
import { retrieveData, storeData } from './localStorage';
import { User } from 'Types/users';
import { Dispatch } from 'react';
import * as SecureStore from 'expo-secure-store'
import { login } from '../API/requests';

const onAuthentication = async () => {
    const auth: LocalAuthentication.LocalAuthenticationResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authentication with biometrics',
        fallbackLabel: 'Enter Passcode',
    });
    return auth.success;
    
}
const onVerifyBiometrics = async () => {
    let success = await LocalAuthentication.hasHardwareAsync();
    let bioTypes = [];
    if (success) {
        bioTypes = await LocalAuthentication.supportedAuthenticationTypesAsync()
        if (bioTypes.length > 0) {
            success = await LocalAuthentication.isEnrolledAsync();
            if (success) {
                return true;
            }
        }
    }
    return false;
}

const useFaceIdOnOpen = async (user: User, setUser: any, setUseFaceID: Dispatch<boolean>, navigation: any) => {
    const shouldUseFaceID: boolean = await retrieveData('useFaceID', true);
    setUseFaceID(shouldUseFaceID)
    if (shouldUseFaceID && !user?.accessToken) {
        const isEnabled = await onVerifyBiometrics()
        if (isEnabled) {
            const success = await onAuthentication();
            if (success) {
                const storedEmail = await SecureStore.getItemAsync("ht-user-email");
                const storedPassword = await SecureStore.getItemAsync("ht-user-password");
                const res = await login(storedEmail as string, storedPassword as string)
                if (res.ok === true) {
                    await storeData('accessToken', res.accessToken)
                    setUser((prev: User) => ({ 
                        ...prev,
                        isAuthenticated: true,
                        email: storedEmail, 
                        id: res.userId,
                        accessToken: res.accessToken
                    }))
                    navigation.navigate('App', {screen: 'Home'})
                }
            }
        }
    }
};

export { onAuthentication, onVerifyBiometrics, useFaceIdOnOpen };