import { Stack } from "expo-router";

export default function QuranLayout() {
	return (
		<Stack screenOptions={{
			headerShown: false
		}}>
			<Stack.Screen name="index" />
		</Stack>
	);
}
