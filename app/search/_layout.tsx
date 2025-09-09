import { Stack } from "expo-router";

export default function SearchLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="charity" />
			<Stack.Screen name="explore" />
			<Stack.Screen name="home" />
			<Stack.Screen name="profile" />
			<Stack.Screen name="quran" />
		</Stack>
	);
}
