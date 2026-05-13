import ListProductCard from '@/components/ListProductCard';
import Colors from '@/constants/Colors';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function Products() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    const db = useSQLiteContext();
    const [produits, setProduits] = useState<any[]>([]);
    const styles = StyleSheet.create({
        wrapper: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },

        header: {
            flex: 1,
            fontSize: 24,
            color: colors.text,
            textAlign: 'center',
        },

        listProductCardWrapper: {
            alignItems: 'center',
            flex: 10,
            display: 'flex',
            flexDirection: 'column',
            borderColor: 'white',
            borderStyle: 'solid',
            borderWidth: 1,

        },
        listProductCard: {
            width: '100%',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            borderColor: 'red',
            borderStyle: 'solid',
            borderWidth: 1,
            margin: 3,

        },
        listProductCardData: {
            textAlign: 'center',
            flex: 1,
            color: colors.text,
            fontSize: 18,
        },


    });
    const getProducts = async () => {
        //prendre les produits de la bd
        await db.getAllAsync("SELECT * FROM produits").then((p) => {
            // pour obtenir tous les résultats sous forme de tableau d'objets et le mettre dans produits.
            setProduits(p);
        });
    }
    // produits hardcoded pour tester
    useEffect(() => {
        getProducts();
        if (produits.length == 0) {
            setProduits([
                { id: 0, nom: "item1", description: "desc item1", prix: 1.99, image: "app/assets/images/item1" },
                { id: 1, nom: "item2", description: "desc item2", prix: 2.99, image: "app/assets/images/item2" },
                { id: 2, nom: "item3", description: "desc item3", prix: 3.99, image: "app/assets/images/item3" },
                { id: 3, nom: "item4", description: "desc item4", prix: 4.99, image: "app/assets/images/item4" },
                { id: 4, nom: "item5", description: "desc item5", prix: 5.99, image: "app/assets/images/item5" },
                { id: 5, nom: "item6", description: "desc item6", prix: 6.99, image: "app/assets/images/item6" }
            ])
        }
    }, []);


    return (
        <View style={styles.wrapper}>
            <Text style={[styles.header]}>Liste de Produits</Text>
            <View style={styles.listProductCardWrapper}>
                <View style={styles.listProductCard}>
                    <Text style={styles.listProductCardData}> Image </Text>
                    <Text style={styles.listProductCardData}> Nom </Text>
                    <Text style={styles.listProductCardData}> Prix </Text>
                </View>
                <FlatList
                    data={produits}
                    renderItem={ListProductCard}
                    keyExtractor={item => item.id} />
            </View>


        </View>
    )

}
