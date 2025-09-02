import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { THEME } from "@/lib/theme";

export function HomeHadith() {
	return (
		<View className="px-4 mt-4">
			<Text className="font-semibold text-lg mb-2">Hadith of the Day</Text>

			<Card className="p-0 overflow-hidden">
				<LinearGradient
					colors={[THEME.light.primary, THEME.light.secondary]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={{
						padding: 16,
						gap: 8
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
