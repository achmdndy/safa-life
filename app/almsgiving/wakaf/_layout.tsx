import { Stack } from "expo-router";

export default function WakafLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
