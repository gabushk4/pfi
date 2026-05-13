//Gabirel Pereira Levesque

import Colors from '@/constants/Colors';
import { getHeaderStyle } from '@/constants/HeaderStyles';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AuthLayout() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? "light"]
  return (
    <Stack
      screenOptions={{...(getHeaderStyle(colors)), headerBackButtonDisplayMode:'minimal'}}
    >
      <Stack.Screen name="login" options={{ headerTitle:'Connexion', }} />
      <Stack.Screen name="register" options={{ headerTitle: 'Inscription'}} />
    </Stack>
  );
}