import { Stack } from "expo-router";

export default function QuranBySurahIdTranslationsLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
		</Stack>
	);
}
