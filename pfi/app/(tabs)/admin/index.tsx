import Colors from '@/constants/Colors';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function Admin() {
    const db = useSQLiteContext();
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
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
    const InitInsert = async () => {
        const stmt = await db.prepareAsync('INSERT INTO produits (nom, description, prix, image) VALUES ($nom, $description, $prix, $image)');
        const produits = ([
            { id: 0, nom: "item1", description: "desc item1", prix: 1.99, image: "item1" },
            { id: 1, nom: "item2", description: "desc item2", prix: 2.99, image: "item2" },
            { id: 2, nom: "item3", description: "desc item3", prix: 3.99, image: "item3" },
            { id: 3, nom: "item4", description: "desc item4", prix: 4.99, image: "item4" },
            { id: 4, nom: "item5", description: "desc item5", prix: 5.99, image: "item5" },
            { id: 5, nom: "item6", description: "desc item6", prix: 6.99, image: "item6" }
        ]);
        let result;
        for (let i = 0; i < produits.length; i++) {
            result = await stmt.executeAsync({ $nom: produits[i].nom, $description: produits[i].description, $prix: produits[i].prix, $image: produits[i].image });
            console.log("result : ", result.lastInsertRowId, result.changes);
        }

    }


    return (
        <View>
            <TouchableOpacity
                onPress={InitInsert}>
                <Text style={{ color: colors.text }}>Hydrate DB</Text>
            </TouchableOpacity>
        </View>
    )
}