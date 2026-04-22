import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { View, Text, useColorScheme } from 'react-native';

export default function Products() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light']
    
    return (
        <View>
            <Text style={[typography.title, { color:colors.text}]}>Produits</Text>
        </View>
    )
}