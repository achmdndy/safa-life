import { Stack } from "expo-router";

export default function JournalLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
