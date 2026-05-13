//Gabriel Pereira Levesque

import { Stack } from "expo-router";
import { View } from "react-native";

export default function AccountLayout() {
    return (
        <Stack
            
        >
            <Stack.Screen
                name="index" options={{headerShown:false}}
            />
            <Stack.Screen
                name="warehouses"
                options={{
                    headerBackButtonDisplayMode: 'minimal',
                    headerTransparent: true,
                    headerTitle: "",
                }}
            />
        </Stack>
    )
}