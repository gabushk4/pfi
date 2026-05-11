import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { AccountProvider, useAccount } from '@/contexts/account';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    EagleLake: require('../assets/fonts/EagleLake-Regular.ttf'),
    Macondo: require('../assets/fonts/MacondoSwashCaps-Regular.ttf'),
    ...FontAwesome.font,
  });
  
  //TODO: ajouter la table produits if not exists
  async function initDB(db: SQLiteDatabase) {
    const result = await db.getFirstAsync<{user_version:number}>('PRAGMA user_version');
    const currentVersion = result?.user_version || 0;
    if (currentVersion < 1) {
      await db.execAsync(`      
        CREATE TABLE IF NOT EXISTS clients (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mdp varchar(20) NOT NULL, 
          pseudo VARCHAR(20) NOT NULL, 
          courriel VARCHAR(128) NOT NULL, 
          courriel_verifie_a TIMESTAMP DEFAULT null, 
          admin TINYINT DEFAULT 0, 
          adresse VARCHAR(128), 
          langue_preferee VARCHAR(3) DEFAULT 'fr'
        );  
        CREATE TABLE IF NOT EXISTS produits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom VARCHAR(50) NOT NULL,
        description VARCHAR(50) NOT NULL,
        prix FLOAT NOT NULL,
        image VARCHAR(50) NOT NULL
        );
        
        UPDATE clients SET admin = 1 WHERE pseudo = 'alkemist';
      `); 
    }
  }

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName='pfi' onInit={initDB}>
    <AccountProvider>
      <RootLayoutNav />
    </AccountProvider>
    </SQLiteProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"]
  const router = useRouter();
  const {isLoggedIn : loggedIn} = useAccount() 

  useEffect(() => {
    if (loggedIn) {
      router.dismissAll();
      router.replace('/(tabs)/products');
    }
  }, [loggedIn]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>   
      <Stack
        screenOptions={{
          headerTitleStyle: { fontFamily: 'Macondo', fontSize: 24 },
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false, headerBackVisible:true}} />
      </Stack>
    </ThemeProvider>
  );
}
