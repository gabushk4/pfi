import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { useSQLiteContext } from 'expo-sqlite';
import { Text, useColorScheme, View } from 'react-native';

export default function Products() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    const db = useSQLiteContext();
    return (
        <View>
            <Text style={[typography.title, { color:colors.text}]}>Details</Text>
        </View>
    )
}