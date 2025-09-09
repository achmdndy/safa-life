import { Stack } from "expo-router";

export default function HomeSearchLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
