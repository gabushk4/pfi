import { Stack } from "expo-router";

export default function DetailsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="details" options={{headerShown:false}}
            />
        </Stack>
    )
}