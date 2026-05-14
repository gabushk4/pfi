import ListProductCard from '@/components/ListProductCard';
import Colors from '@/constants/Colors';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { FlatList, StyleSheet, useColorScheme, View } from 'react-native';

export default function Admin() {
    const db = useSQLiteContext();
    const [produits, setProduits] = useState<any[]>([]);
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

    const order66 = async () => {
        const stmt = await db.prepareAsync('DELETE FROM produits WHERE 1=1');

        let result = await stmt.executeAsync();
        console.log("result : ", result.lastInsertRowId, result.changes);
    }
    const getProducts = async () => {
        //prendre les produits de la bd
        await db.getAllAsync("SELECT * FROM produits").then((p) => {
            // pour obtenir tous les résultats sous forme de tableau d'objets et le mettre dans produits.
            setProduits(p);
        });
    }
    useFocusEffect(React.useCallback(() => {
        getProducts();
    }, []));
    return (
        <View style={styles.wrapper}>
            {/* <TouchableOpacity
                onPress={order66}>
                <Text style={{ color: colors.text }}>Hydrogen bomb</Text>
            </TouchableOpacity> */}

            {/* <Text style={[styles.header]}>Liste de Produits</Text> */}
            <View style={styles.listProductCardWrapper}>
                <FlatList style={{ width: 'auto' }}
                    data={produits}
                    renderItem={({ item }) =>
                        <ListProductCard produit={item} from='delete' />}
                    keyExtractor={item => item.id} />
            </View>
        </View>
    )
}

