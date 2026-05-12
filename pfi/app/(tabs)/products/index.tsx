import ListProductCard from '@/components/ListProductCard';
import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { FlatList, Text, useColorScheme, View } from 'react-native';

export default function Products() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    const db = useSQLiteContext();
    const [produits, setProduits] = useState<any[]>([]);
    useEffect(() => {
        //prendre les produits de la bd
        async function getProducts() {
            const produits = await db.getAllAsync("SELECT * FROM produits"); // pour obtenir tous les résultats sous forme de tableau d'objets.
            setProduits(produits);
        }
        //appeler la fonction
        getProducts();
    },[]);
    return (
        <View>
            <Text style={[typography.title, { color: colors.text }]}>Produits</Text>
            <FlatList
                data={produits}
                renderItem={(item:any) => ListProductCard(item)}
                keyExtractor={item => item.id} />
        </View>
    )
}
