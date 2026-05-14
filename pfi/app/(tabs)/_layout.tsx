import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { getHeaderStyle } from '@/constants/HeaderStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import HeaderRight from '../../components/headerRight';
import MainMenu from '../../components/mainMenu';
import { useAccount } from '../../contexts/account';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  const [language, setLanguage] = useState("auto")

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"]

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { account } = useAccount()
  const isAdmin = account?.admin;
  useEffect(() => {
    if (isMenuOpen)
      setIsModalOpen(isMenuOpen)
  }, [isMenuOpen])

  return (
    <>
      <Modal
        visible={isModalOpen}
        transparent={true}
      >
        <MainMenu isMenuOpen={isMenuOpen} setIsModalOpen={setIsModalOpen} setIsMenuOpen={setIsMenuOpen} setLanguage={setLanguage} language={language} />
      </Modal>
      <Tabs
        screenOptions={{
          ...(getHeaderStyle(colors)),
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
            headerRight: () => <HeaderRight currentLanguage={language} currentPage="products" onMenuClick={() => setIsMenuOpen(true)} />
          }} />
        <Tabs.Screen
          name="cart"
          options={{
            href: '/cart',
            headerTitle: "Panier", //TODO: internationaliser
            title: "Panier", //TODO: internationaliser
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cart" size={24} color={color} />,
            headerRight: () => <HeaderRight currentLanguage={language} currentPage="cart" onMenuClick={() => setIsMenuOpen(true)} />
          }} />
        <Tabs.Screen name="account"
          options={{
            headerTitle: "Compte", //TODO: internationaliser
            title: "Compte", //TODO: internationaliser
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={24} color={color} />,
            headerRight: () => <HeaderRight currentLanguage={language} currentPage="account"
              onMenuClick={() => {
                setIsMenuOpen(true)
              }} />
          }} />
       
          <Tabs.Screen name="admin"
            options={{
              href: isAdmin ? '/(tabs)/admin' : null,
              headerTitle: "Admin", //TODO: internationaliser
              title: "Admin", //TODO: internationaliser
              tabBarIcon: ({ color }) => <MaterialCommunityIcons name="security" size={24} color={color} />,
              headerRight: () => <HeaderRight currentLanguage={language} currentPage="account"
                onMenuClick={() => {
                  setIsMenuOpen(true)
                }} />
            }} />

      </Tabs>
    </>
  );
}
