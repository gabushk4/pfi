import { Stack } from "expo-router";

export default function ProductsLayout() {
    return (
        <Stack >
            <Stack.Screen name="index" options={{ headerShown: false, headerLeft: () => null }} />
            <Stack.Screen name="[id]" options={{
                headerBackButtonDisplayMode:'minimal', headerTransparent:true, headerBackVisible: true, headerTitle: ""
            }} />
        </Stack>

    )
}