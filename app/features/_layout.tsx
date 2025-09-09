import { Stack } from "expo-router";

export default function FeaturesLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="halal" />
			<Stack.Screen name="journal" />
			<Stack.Screen name="qibla" />
			<Stack.Screen name="tasbih" />
		</Stack>
	);
}
