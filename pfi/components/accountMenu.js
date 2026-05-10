import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';

export default function AccountMenu({ isMenuOpen }) {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme] ?? "light";
    

    const s = StyleSheet.create({
        titre: {
            color: colors.text
        },
        container: {
            marginTop: 16,
            flex: 1, 
            width: '100%',
            flexDirection: 'column',
            paddingHorizontal: 16,
        }

    })
    return (
        <View style={s.container}>
            <Link href="/(tabs)/account/warehouses">
                <Text style={[typography.body, { color: colors.text, fontSize: 20, textDecorationLine:'underline', textDecorationColor:colors.tint}]}>Entrepôts</Text>
            </Link>
        </View>
    )
}