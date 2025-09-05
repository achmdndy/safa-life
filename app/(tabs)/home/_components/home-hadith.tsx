import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

export function HomeHadith() {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="px-4 mt-4">
			<Text className="font-semibold text-lg mb-2">Hadith of the Day</Text>

			<Card className="p-0 overflow-hidden">
				<LinearGradient
					colors={[selectedTheme.primary, selectedTheme.secondary]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={{
						padding: 16,
						gap: 8,
					}}
				>
					<CardContent className="p-0">
						<Text className="text-white">
							"Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Assumenda, tempora."
						</Text>
					</CardContent>
					<CardFooter className="p-0 items-center justify-end">
						<Text className="text-white">- Lorem, ipsum.</Text>
					</CardFooter>
				</LinearGradient>
			</Card>
		</View>
	);
}
