import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Animated, Dimensions, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, useAnimatedValue, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { getHeaderStyle } from '@/constants/HeaderStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HamburgerMenu from '../hamburgerMenu';
import AccountMenu from '../accountMenu'
import HeaderRight from '../headerRight'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { typography } from '@/constants/typography';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  //TODO: insert into internationalisation context
  const languages = [
    { "label": "Français", "value": "fr" },
    { "label": "English", "value": "en" },
    { "label": "Auto", "value":"auto" }
  ]
  const [language, setLanguage] = useState("auto")

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"]
  const screenWidth = Dimensions.get("screen").width
  const insets = useSafeAreaInsets()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [menuOpenFrom, setMenuOpenFrom] = useState<'account' | 'index'>('index')

  const menuContent: Record<string, React.ReactElement> = {
    "account": <AccountMenu isMenuOpen={isMenuOpen} />
  }

  const openMenuAnim = useAnimatedValue(1)

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
      setIsModalOpen(true)        
    } else {
      console.log("menu closed")
      closeMenu()
      setTimeout(() => {
        setIsModalOpen(false)
      }, 500)
    }
  }, [isMenuOpen])

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
    <>
      <Modal
        visible={isModalOpen}
        transparent={true}
      >
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
            //-- Account control menu
            <View style={s.menuSection}>
              <Text style={[typography.subtitle, { color: colors.text }]}>Compte</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  
                />
                <TouchableOpacity style={{width:'80%', height:32, borderWidth:1, borderColor:colors.tint}}>
                  <Text style={{ color: colors.tint}}>Déconnexion</Text>
                </TouchableOpacity>
              </View>
            </View>
            //-- Language radio menu --
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
            //-- By page context menu --
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
      </Modal>
      <Tabs
        screenOptions={{...(getHeaderStyle(colors)), 
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}>  
        <Tabs.Screen
          name="products"
          options={{
            headerTitle: "Produits", //TODO: internationaliser
            title: "Produits", //TODO: internationaliser
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="crystal-ball" size={24} color={color} />,
            headerRight:() => <HeaderRight currentLanguage={language} currentPage="products" onMenuClick={()=> setIsMenuOpen(true)}/>
          }}/>
        <Tabs.Screen
        name="cart"
          options={{
            headerTitle: "Panier", //TODO: internationaliser
            title: "Panier", //TODO: internationaliser
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cart" size={24} color={color} />,
            headerRight:() => <HeaderRight currentLanguage={language} currentPage="cart" onMenuClick={()=> setIsMenuOpen(true)}/>
          }}/>
        <Tabs.Screen name="account"
          options={{
            headerTitle: "Compte", //TODO: internationaliser
            title: "Compte", //TODO: internationaliser
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={24} color={color} />,
            headerRight:() => <HeaderRight currentLanguage={language} currentPage="account" onMenuClick={()=> setIsMenuOpen(true)}/>
          }} />
      </Tabs>
    </>
  );
}
