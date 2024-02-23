import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { useDayQuery } from '../API/Queries/dayQueries';

export default function Home() {
    const context = useContext(UserContext);
    const user = context?.user!
    const day = new Date()
    day.setDate(day.getDate())
    const date = day.toISOString().substring(0,10)

    const { data, isLoading, isError } = useDayQuery(user!, date);

    if (isLoading  || isError) {
        return (
            <SafeAreaView>
                <View style={style.signOutBtn}>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView>
            <View style={style.signOutBtn}>
                <Text>{JSON.stringify(data)}</Text>
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