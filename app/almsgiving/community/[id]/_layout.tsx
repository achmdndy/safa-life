import { Stack } from "expo-router";

export default function CommunityByIdLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
