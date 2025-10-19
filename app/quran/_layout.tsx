import { Stack } from "expo-router";

export default function QuranWithoutBottomTabsLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="[surahId]" />
		</Stack>
	);
}
