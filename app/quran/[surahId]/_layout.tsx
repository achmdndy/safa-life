import { Stack } from "expo-router";

export default function QuranBySurahIdLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="settings" />
		</Stack>
	);
}
