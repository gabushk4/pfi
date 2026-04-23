import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Modal, Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { getHeaderStyle } from '@/constants/HeaderStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HamburgerMenu from '../hamburgerMenu';
import AccountMenu from '../accountMenu'

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
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuOpenFrom, setMenuOpenFrom] = useState<'account' | 'index'>('account')

  const menuContent: Record<string, React.ReactElement> = {
    "account": <AccountMenu/>
  }

  return (
    <>
      <Modal
        visible={isMenuOpen}
      >
        {menuContent[menuOpenFrom]}
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
