import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { View, Text, useColorScheme } from 'react-native';

export default function Account() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light']
    
    return (
        <View>
            <Text style={[typography.title, { color:colors.text}]}>Compte</Text>
        </View>
    )
}