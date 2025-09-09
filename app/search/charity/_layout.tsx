import { Stack } from "expo-router";

export default function CharitySearchLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
