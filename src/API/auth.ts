import * as LocalAuthentication from 'expo-local-authentication'

const onAuthentication = async () => {
    const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authentication with biometrics',
        fallbackLabel: 'Enter Passcode',
    });
    console.log(auth.success, auth);
    
}


interface IUserAuth {
    email: string;
    password: string;
}

const login = async (credentials: IUserAuth) => {
    try {
        const res = await fetch('https://www.health-tracker-api.com/authn/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        });
        return await res.json();
    } catch (err: unknown) {
        return err;
    };
};

const register = async (credentials: IUserAuth) => {
    console.log(URL)
    try {
        const res = await fetch('https://www.health-tracker-api.com/authn/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        });
        return await res.json();
    } catch (err: unknown) {
        return err;
    };
};

export { login, register, onAuthentication };