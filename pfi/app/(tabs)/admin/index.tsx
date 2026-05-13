import Colors from '@/constants/Colors';
import { useSQLiteContext } from 'expo-sqlite';
import { useColorScheme, View } from 'react-native';

export default function Admin() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    const db = useSQLiteContext();
    return (
        <View>

        </View>
    )
}