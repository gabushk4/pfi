import React, { useEffect } from 'react';
import { Animated, StyleSheet, Dimensions, Pressable, Text, TouchableOpacity, useAnimatedValue, View } from 'react-native';

import ProfilePicture from './profilePicture';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { typography } from '@/constants/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AccountMenu from './accountMenu';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAccount } from '@/contexts/account';
import { useRouter } from 'expo-router';

export default function MainMenu({ isMenuOpen, menuOpenFrom, setIsModalOpen, setIsMenuOpen, setLanguage, language }) {

    //TODO: insert into internationalisation context
  const languages = [
    { "label": "Français", "value": "fr" },
    { "label": "English", "value": "en" },
    { "label": "Auto", "value":"auto" }
  ]
    
    const route = useRouter()
    
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"]
  const screenWidth = Dimensions.get("screen").width
    const insets = useSafeAreaInsets()
    const openMenuAnim = useAnimatedValue(1)

    const { account, logout } = useAccount()

    const openMenu = () => {
        Animated.timing(openMenuAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
        }).start();
    }

    const closeMenu = () => {
    Animated.timing(openMenuAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
    }).start();
    }

    useEffect(() => {
    if (isMenuOpen) {
        console.log("menu opened")
            
        openMenu()           
    } else {
        console.log("menu closed")
        closeMenu()
        setTimeout(() => {
        setIsModalOpen(false)
        }, 500)
    }
    }, [isMenuOpen])
    
    const menuContent = {
        "account": <AccountMenu isMenuOpen={isMenuOpen} />
    }

    const s = StyleSheet.create({
    radioButton: {
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors.tint,
      height: 16,
      aspectRatio: 1 / 1,
      alignItems: 'center',
      justifyContent:'center'
    },
    radioContainer: {
      padding:4,
      gap: 2,
      flexDirection:'row',
    },
    radioLabel: {
      color:colors.text
    },
    radioSelected:{
      borderRadius: 100,
      width: '72%',
      aspectRatio:1/1,
      backgroundColor:colors.tint,
    },
    menuSection: {
      width: '100%',
      gap:4
    }
  })

    
    return (
        <Animated.View style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',  
                  alignItems: 'flex-end',
                  flexDirection:'row',
                  transform: [{
                    translateX: openMenuAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange:[0, screenWidth * 0.6]
                  }) }]
                }}>   
        <Pressable
            style={{width:"40%", height:'100%', backgroundColor:colors.backdrop}}
            onPress={()=>setIsMenuOpen(false)}
        />  
            <View style={{
            position: 'relative', width: '60%', height: '100%', backgroundColor: colors.background,
            borderLeftWidth: 1,
            borderColor: colors.tint,
            paddingTop: insets.top,
            alignItems: 'center',
            gap: 8,
            paddingHorizontal:8
            }}>    
            
            <Text style={[typography.title, {color:colors.text, marginBottom:16}]}>Menu</Text>
            
            <View style={s.menuSection}>
                    <Text style={[typography.subtitle, { color: colors.text }]}>Compte de { account?.username }</Text>
                <View style={{ alignItems:'center', justifyContent:'space-between', flexDirection: 'row', gap:8 }}>
                    <Pressable style={{height: 80, width: 80 }} onPress={() => {
                        console.log('profile pressed')
                            setIsMenuOpen(false)
                            
                        setTimeout(() => {
                            route.replace('/(tabs)/account')
                        }, 600)
                    }}>
                        <ProfilePicture isEditing={false} pointerEvents="none" />
                    </Pressable>
                        <TouchableOpacity style={{ padding: 8, width: '50%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.tint }}
                            onPress={() => {
                                setIsMenuOpen(false)
                                setTimeout(() => {
                                    route.replace('/(auth)/login')
                                    logout()    
                                }, 600)                                
                            }}
                        >
                        <MaterialCommunityIcons name='logout' color={colors.tint} size={32}/>
                    </TouchableOpacity>
                </View>
                </View>
                
            <View style={s.menuSection}>
                <Text style={[typography.subtitle, {color:colors.text}]}>Choisir la langue</Text>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                {languages.map(({label, value}) => {
                    return (
                    <Pressable key={value} style={s.radioContainer}
                        onPress={() => {
                        setLanguage(value)
                        }}
                    >                
                        <View style={s.radioButton}>
                        {language == value &&
                            <View style={s.radioSelected} /> 
                        }
                        </View>
                        <Text style={[s.radioLabel, typography.body]}>
                        {label}
                        </Text>
                    </Pressable>
                    )
                })}
                </View>  
            </View>
                {menuContent[menuOpenFrom]}            
            <TouchableOpacity style={{ position: 'absolute', bottom:0, height:64, width:'100%', }}
                onPress={() => {
                setIsMenuOpen(false)
                }}
            >
                <MaterialCommunityIcons style={{}} name="arrow-right-circle-outline" size={56} color={colors.tint} />
            </TouchableOpacity>
            </View> 
        </Animated.View>
    )
}