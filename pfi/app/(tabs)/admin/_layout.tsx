import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { getHeaderStyle } from '@/constants/HeaderStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { useAccount } from '../../../contexts/account';

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

    const { account } = useAccount()
    const isAdmin = account?.admin;

    return (
        <>
            <Tabs
                screenOptions={{
                    ...(getHeaderStyle(colors)),
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    // Disable the static render of the header on web
                    // to prevent a hydration error in React Navigation v6.
                    headerShown: useClientOnlyValue(false, true),
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        href: isAdmin ? '/(tabs)/admin' : null,
                        headerShown:false, //TODO: internationaliser
                        title: "Ajouter", //TODO: internationaliser
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus" size={24} color={color} />,
                    }} />
                <Tabs.Screen name="delete"
                    options={{
                        href: isAdmin ? '/(tabs)/admin/delete' : null,
                        headerTitle: "Admin", //TODO: internationaliser
                        title: "Retirer", //TODO: internationaliser
                        headerShown: false,
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="minus" size={24} color={color} />,
                    }} />

            </Tabs>
        </>
    );
}
