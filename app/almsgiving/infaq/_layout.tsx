import { Stack } from "expo-router";

export default function InfaqLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
