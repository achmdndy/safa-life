import { PanelTopDashed } from "lucide-react-native";
import { Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import { HomeFeatureCard } from "./home-feature-card";

export function HomePilgrimage() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-2 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={PanelTopDashed}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Pilgrimage</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-between gap-3 mx-4 py-2">
				{Array.from({ length: 8 }).map((_, index) => (
					<HomeFeatureCard key={index.toString()} />
				))}
			</View>
		</View>
	);
}
