import { Stack } from "expo-router";

export default function CalculateZakatLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
