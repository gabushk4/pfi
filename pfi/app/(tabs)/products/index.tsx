import ListProductCard from '@/components/ListProductCard';
import Colors from '@/constants/Colors';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
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
            flex: 10,
            display: 'flex',
            flexDirection: 'column',
            borderColor: 'white',
            borderStyle: 'solid',
            borderWidth: 1,

        },
        listProductCard: {
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
    // useFocusEffect : chaque fois que l'index obtien le focus de l'utilisateur, on refetch les items pour les mettre a jours
    useFocusEffect(React.useCallback(() => {
        getProducts();
    }, [])
    );

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.header]}>Liste de Produits</Text>
            <View style={styles.listProductCardWrapper}>
                <View style={styles.listProductCard}>
                    <Text style={styles.listProductCardData}> Image </Text>
                    <Text style={styles.listProductCardData}> Nom </Text>
                    <Text style={styles.listProductCardData}> Prix </Text>
                    <Text style={styles.listProductCardData}> Details </Text>
                </View>
                <FlatList style={{ width: 'auto' }}
                    data={produits}
                    renderItem={ListProductCard}
                    keyExtractor={item => item.id} />
            </View>
        </View>
    )

}
