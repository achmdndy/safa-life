import { Stack } from "expo-router";

export default function ArticlesLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
