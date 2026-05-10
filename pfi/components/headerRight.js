import React from "react"
import { Pressable, Text, useColorScheme, View } from "react-native"
import HamburgerMenu from './hamburgerMenu'
import Colors from '../constants/Colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { typography } from "@/constants/typography";
import { useMenu } from "@/contexts/menu";

export default function HeaderRight({ currentPage, onMenuClick, currentLanguage }) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"]

    const language = currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1) //Capitalizes first letter

    const { setOpenFrom } = useMenu()
    
    return (
        <Pressable style={{ width: '88%', flexDirection: "row", justifyContent: 'space-between' }}
            onPress={() => {
                console.log("header right opens from", currentPage)
                setOpenFrom(currentPage)
                onMenuClick()
            }}
        >
            <View style={{gap:4, flexDirection:'row', alignItems:'center' }}>
                <MaterialIcons name="language" size={24} color={colors.tint} />
                <Text style={[typography.body, {color:colors.text}]}>{ language }</Text>
            </View>
            <HamburgerMenu tintColor={colors.tint}
                onOpen={() => {
                    setOpenFrom(currentPage)
                    onMenuClick()
                }}
            />
        </Pressable>
    )
}