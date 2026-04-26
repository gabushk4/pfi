import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';

export default function AccountMenu({ isMenuOpen }) {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme] ?? "light";
    

    const s = StyleSheet.create({
        titre: {
            color: colors.text
        }
    })
    return (
        <View>
            <View>
                <Text>Maps</Text>
            </View>
        </View>
    )
}