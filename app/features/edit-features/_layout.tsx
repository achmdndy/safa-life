import { Stack } from "expo-router";

export default function EditFeaturesLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}
