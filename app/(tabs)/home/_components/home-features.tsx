import { Compass, BookOpen, Heart, PenTool, Utensils } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";
import { Card, CardContent } from "@/components/ui/card";

export function HomeFeatures() {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	const features = [
		{
			id: 1,
			name: "Qibla",
			icon: Compass,
			description: "Find direction"
		},
		{
			id: 2,
			name: "Tasbih",
			icon: Heart,
			description: "Digital counter"
		},
		{
			id: 3,
			name: "Journal",
			icon: PenTool,
			description: "Daily notes"
		},
		{
			id: 4,
			name: "Halal",
			icon: Utensils,
			description: "Food guide"
		}
	];

	return (
		<View className="px-4 mt-4">
			<View className="flex-row items-center justify-between">
				<Text className="font-semibold text-lg mb-2">Features</Text>
				<Button variant="ghost" size="sm">
					<Text>View More</Text>
				</Button>
			</View>

			<View className="flex-row items-center justify-between mt-2">
				{features.map((feature) => {
					const IconComponent = feature.icon;
					return (
						<Card key={feature.id} className="border-transparent flex-1 items-center bg-card p-3 rounded-lg mx-1"
						style={{
							shadowColor: selectedTheme.primary,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 4,
						}}>
							<CardContent className="p-0 items-center">
								<View 
									className="w-10 h-10 rounded-full items-center justify-center mb-2"
									style={{ backgroundColor: selectedTheme.primary + '20' }}
								>
									<IconComponent 
										width={20} 
										height={20} 
										color={selectedTheme.primary} 
									/>
								</View>
								<Text className="text-xs font-semibold text-center" numberOfLines={1}>
									{feature.name}
								</Text>
								<Text className="text-xs text-muted-foreground text-center mt-1" numberOfLines={1}>
									{feature.description}
								</Text>
							</CardContent>
						</Card>
					);
				})}
			</View>
		</View>
	);
}
