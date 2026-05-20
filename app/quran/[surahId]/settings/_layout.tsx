import { Stack } from "expo-router";

export default function QuranBySurahIdSettingsLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="translations" />
		</Stack>
	);
}
