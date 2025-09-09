import { Stack } from "expo-router";

export default function ThemeLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
