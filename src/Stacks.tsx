import { useEffect, useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { retrieveData } from './Utils/localStorage';
import { FontAwesomeIcon, faHouse,  faStaffSnake, faBurger, faDumbbell, faGear } from './assets/icons';

import { UserProvider, UserContext, User, UserContextType } from './Context/UserContext';
// Screens
import Login from './Screens/Login'
import Register from './Screens/Register';
import Home from './Screens/Home';
import Medical from './Screens/Medical';
import Nutrition from './Screens/Nutrition';
import Exercise from './Screens/Exercise';
import Settings from './Screens/Settings';

type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
};
type MainStackParamList = {
  BottomNav: undefined;
};


export default function Stacks() {
	const context = useContext<UserContextType | null>(UserContext);

	
	useEffect(() => {
		(async () => {
			const storedAccessToken = await retrieveData('accessToken');
			if (storedAccessToken) {
				context?.setUser((prev: User) => ({...prev, accessToken: storedAccessToken}));
			}
		})()
    }, [])
	
	const RootStack = createNativeStackNavigator();
	const AuthStack = createNativeStackNavigator<AuthStackParamList>();
	const MainStack = createNativeStackNavigator<MainStackParamList>();
    const Tab = createBottomTabNavigator();
	
    const Auth = () => {
        return (
            <AuthStack.Navigator>
				<AuthStack.Screen name="Login" component={Login} />
				<AuthStack.Screen name="Register" component={Register} />
			</AuthStack.Navigator>
        )
    }
    const App = () => {
        return (
            <MainStack.Navigator screenOptions={{headerShown: false}}>
                <MainStack.Screen name="BottomNav" component={MyTabs} />
            </MainStack.Navigator>
        )
    }
    function MyTabs() {
        return (
            <Tab.Navigator >
                <Tab.Screen options={{tabBarIcon: (props) => <FontAwesomeIcon icon={faStaffSnake} {...props} />}} name="Medical" component={Medical} />
                <Tab.Screen options={{tabBarIcon: (props) => <FontAwesomeIcon icon={faBurger} {...props} />}} name="Nutrition" component={Nutrition} />
                <Tab.Screen options={{tabBarIcon: (props) => <FontAwesomeIcon icon={faHouse} {...props} />}} name="Home" component={Home} />
                <Tab.Screen options={{tabBarIcon: (props) => <FontAwesomeIcon icon={faDumbbell} {...props} />}} name="Exercise" component={Exercise} />
                <Tab.Screen options={{tabBarIcon: (props) => <FontAwesomeIcon icon={faGear} {...props} />}} name="Settings" component={Settings} />
            </Tab.Navigator>
        );
    }
    const Root = () => (
        <UserProvider >
            <NavigationContainer>
                <RootStack.Navigator screenOptions={{headerShown: context?.user?.isAuthenticated ?? false}}>
                    <RootStack.Screen name='Auth' component={Auth} />
                    <RootStack.Screen name='App' component={App} />
                </RootStack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
    
    return (
        <>
            <Root />
        </>
    );
}