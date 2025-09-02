import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function SplashScreen() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.replace("/home");
		}, 100);
	}, [router.replace]);

	return (
		<View className="py-24">
			<Text>SplashScreen</Text>
		</View>
	);
}
