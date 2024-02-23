
import { useContext } from 'react';
import { removeData } from '../Utils/localStorage';
import { UserContext } from '../Context/UserContext';
import { StyleSheet, SafeAreaView, Button, View, Text } from 'react-native';
type Props = {
    navigation: any;
}

export default function Settings({ navigation }: Props) {
    const context = useContext(UserContext);

    async function handleSignOut() {
        context?.setUser({})
        await removeData('accessToken')
        await removeData('useFaceID')
        navigation.navigate('Auth', {screen: 'Login'})
    };
    
    return (
        <SafeAreaView>
            <View style={style.signOutBtn}>
                <Text>Settings</Text>
                <Button 
                    onPress={handleSignOut}
                    title={"Sign Out"}
                    />
            </View>
        </SafeAreaView>
    );
    
    
}

const style = StyleSheet.create({
    signOutBtn: {
        display: "flex",
        position: "absolute",
        right: 0,
        top: 0
    }
})