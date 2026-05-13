import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function Details() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    const { id } = useLocalSearchParams();
    console.log(id);
    const db = useSQLiteContext();
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
            <Text style={[typography.title, { color: colors.text }]}>Details du produit</Text>
            <Text style={[typography.title, { color: colors.text }]}>{id}</Text>
            {/* <ProductCard produit={produit} /> */}
        </View>
    )
}