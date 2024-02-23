import { 
    // useMedicalMutation, 
    useMedicalQuery 
} from '../API/Queries/medicalQueries';
import { UserContext } from '../Context/UserContext';
import { useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function Medical() {
    const context = useContext(UserContext);
    const user = context?.user!
    const day = new Date()
    day.setDate(day.getDate())
    const date = day.toISOString().substring(0,10)

    const { data, isLoading } = useMedicalQuery(user!, date);

    if (isLoading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView>
            <Text>{JSON.stringify(data)}</Text>
        </SafeAreaView>
    );
}