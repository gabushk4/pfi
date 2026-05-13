import { Stack } from "expo-router";

export default function AdminLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="admin" options={{headerShown:false}}
            />
        </Stack>
    )
}