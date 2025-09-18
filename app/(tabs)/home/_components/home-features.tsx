import { useRouter } from "expo-router";
import { Compass, Heart, PenTool, Utensils } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

export function HomeFeatures() {
	const router = useRouter();
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	const features = [
		{
			id: 1,
			name: "Qibla",
			icon: Compass,
			description: "Find direction",
			href: "/features/qibla",
		},
		{
			id: 2,
			name: "Tasbih",
			icon: Heart,
			description: "Digital counter",
			href: "/features/tasbih",
		},
		{
			id: 3,
			name: "Journal",
			icon: PenTool,
			description: "Daily notes",
			href: "/features/journal",
		},
		{
			id: 4,
			name: "Halal",
			icon: Utensils,
			description: "Food guide",
			href: "/features/halal",
		},
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
						<Pressable
							className="flex-1 mx-1"
							key={feature.id}
							onPress={() => router.navigate(feature.href)}
						>
							<Card
								key={feature.id}
								className="border-transparent items-center bg-card rounded-lg p-3"
								style={{
									shadowColor: selectedTheme.primary,
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.1,
									shadowRadius: 4,
								}}
							>
								<CardContent className="p-0 items-center">
									<View
										className="w-10 h-10 rounded-full items-center justify-center mb-2"
										style={{ backgroundColor: `${selectedTheme.primary}20` }}
									>
										<IconComponent
											width={20}
											height={20}
											color={selectedTheme.primary}
										/>
									</View>
									<Text
										className="text-xs font-semibold text-center"
										numberOfLines={1}
									>
										{feature.name}
									</Text>
									<Text
										className="text-xs text-muted-foreground text-center mt-1"
										numberOfLines={1}
									>
										{feature.description}
									</Text>
								</CardContent>
							</Card>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
