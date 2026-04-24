import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Animated, Dimensions, Modal, Pressable, TouchableOpacity, useAnimatedValue, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { getHeaderStyle } from '@/constants/HeaderStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HamburgerMenu from '../hamburgerMenu';
import AccountMenu from '../accountMenu'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"]
  const screenWidth = Dimensions.get("screen").width
  const insets = useSafeAreaInsets()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [menuOpenFrom, setMenuOpenFrom] = useState<'account' | 'index'>('account')

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
      openMenu()
      setIsModalOpen(true)        
    } else{
      closeMenu()
      setTimeout(() => {
        setIsModalOpen(false)
      }, 500)
    }
  }, [isMenuOpen])

  return (
    <>
      <Modal
        visible={isModalOpen}
        backdropColor={colors.backdrop}
      >
        <Animated.View style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '60%',
          height: '50%',
          marginTop:insets.top,          
          transform: [{
            translateX: openMenuAnim.interpolate({
              inputRange: [0, 1],
              outputRange:[0, screenWidth * 0.6]
          }) }]
        }}>         
          <View style={{width:'100%', height:'100%', backgroundColor: colors.background,
          borderWidth: 1,
          borderColor: colors.tint,}}>
            {menuContent[menuOpenFrom]}
          </View>
          <TouchableOpacity style={{ position: 'relative', left: '40%' }}
            onPress={() => {
              setIsMenuOpen(false)
            }}
          >
            <MaterialCommunityIcons name="close" size={40} color={colors.tint} />
          </TouchableOpacity>
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
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="crystal-ball" size={24} color={color} />
          }}/>
        <Tabs.Screen
        name="cart"
          options={{
            headerTitle: "Panier", //TODO: internationaliser
            title: "Panier", //TODO: internationaliser
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cart" size={24} color={color} />
          }}/>
        <Tabs.Screen name="account"
          options={{
            headerTitle: "Compte", //TODO: internationaliser
            title: "Compte", //TODO: internationaliser
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={24} color={color} />,
            headerRight:() => <HamburgerMenu tintColor={colors.tint} onOpen={()=> setIsMenuOpen(true)} onClose={()=>setIsMenuOpen(false)} from="account"/>
          }} />
      </Tabs>
    </>
  );
}
