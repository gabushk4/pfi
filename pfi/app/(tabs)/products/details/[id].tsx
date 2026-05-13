import ProductCard from '@/components/ProductCard';
import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { Text, useColorScheme, View } from 'react-native';

export default function Details() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    const {produit} = useLocalSearchParams();
    const db = useSQLiteContext();
    return (
        <View>
            <Text style={[typography.title, { color:colors.text}]}>Details du produit</Text>
            <ProductCard produit={produit}/>
        </View>
    )
}