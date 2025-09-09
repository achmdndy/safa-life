import { Stack } from "expo-router";

export default function QuranSearchLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
