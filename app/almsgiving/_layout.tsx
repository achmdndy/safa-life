import { Stack } from "expo-router";

export default function AlmsGivingLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="calculate-zakat" />
			<Stack.Screen name="community" />
			<Stack.Screen name="fidyah" />
			<Stack.Screen name="infaq" />
			<Stack.Screen name="kaffarah" />
			<Stack.Screen name="sadaqah" />
			<Stack.Screen name="wakaf" />
			<Stack.Screen name="zakat" />
		</Stack>
	);
}
