import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';
import { Text, useColorScheme, View } from 'react-native';

const getProducts = async () => {
    const db = useSQLiteContext();
    const produits = await db.getAllAsync<{ id: number, nom: string, description: string, prix: number, image: string }>("SELECT * FROM produits"); // pour obtenir tous les résultats sous forme de tableau d'objets.
    return produits.map((e: { id: number, nom: string, description: string, prix: number, image: string }) => { e });
}

export default function Products() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    useEffect(() => {
        const produits = getProducts;
    });
    return (
        <View>
            <Text style={[typography.title, { color: colors.text }]}>Produits</Text>
            for(const produit of tabProduits)
        </View>
    )
}
