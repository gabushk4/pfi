import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function AccountMenu({ isMenuOpen }) {
    return (
        <View>
            <View>
                <Text>Langues</Text>
            </View>
            <View>
                <Text>Maps</Text>
            </View>
        </View>
    )
}