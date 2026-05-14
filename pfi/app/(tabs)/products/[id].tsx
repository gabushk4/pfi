import ProductCard from '@/components/ProductCard';
import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function Details() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    const { id } = useLocalSearchParams();
    const [produit, setProduit] = useState<any>({})
    console.log(id);
    const db = useSQLiteContext();
    const getProducts = async () => {
        //prendre les produits de la bd
        db.getFirstAsync("SELECT * FROM produits WHERE id = ?", [id.toString()]).then((p) => {
            // pour obtenir tous les résultats sous forme de tableau d'objets et le mettre dans produits.
            console.log("produit", p)
            setProduit(p);
        });
    }
    // useFocusEffect : chaque fois que l'index obtien le focus de l'utilisateur, on refetch les items pour les mettre a jours
    useFocusEffect(React.useCallback(() => {
        getProducts();
    }, []));
    console.log(produit);
    if (produit == undefined) {
        setProduit({ nom: 'name couldn\'t be loaded', description: 'descriptions couldn\'t be loaded', prix: 0.00, image: 'image couldn\'t be loaded' })
    }
    console.log(produit);
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
    return (
        <View style={styles.wrapper}>
            <Text style={[typography.title, { color: colors.text }, { textAlign: 'center' }]}>{produit.nom}</Text>
            <ProductCard from="products" produit={produit}></ProductCard>
        </View>
    )
}