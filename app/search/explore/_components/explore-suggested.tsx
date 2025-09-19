import { FlashList } from "@shopify/flash-list";
import { Lightbulb, Sparkles } from "lucide-react-native";
import { View } from "react-native";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

const suggestions = [
	{
		id: 1,
		title: "Morning Prayers Guide",
		type: "Guide",
		category: "Worship",
		popularity: "High",
	},
	{
		id: 2,
		title: "Quran Memorization Tips",
		type: "Tips",
		category: "Learning",
		popularity: "Medium",
	},
	{
		id: 3,
		title: "Islamic History Timeline",
		type: "Educational",
		category: "History",
		popularity: "High",
	},
	{
		id: 4,
		title: "Dua for Daily Life",
		type: "Collection",
		category: "Spirituality",
		popularity: "High",
	},
	{
		id: 5,
		title: "Halal Food Guidelines",
		type: "Guide",
		category: "Lifestyle",
		popularity: "Medium",
	},
	{
		id: 6,
		title: "Prophet Stories for Kids",
		type: "Stories",
		category: "Children",
		popularity: "High",
	},
];

export function ExploreSuggested() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Lightbulb}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Suggested for You</Text>
				</View>
				<View className="flex-row items-center">
					<Icon as={Sparkles} size={16} className="mr-1" stroke="#fbbf24" />
					<Text className="text-sm text-yellow-500">Personalized</Text>
				</View>
			</View>

			<FlashList
				data={suggestions}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 16 }}
				ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
				renderItem={({ item: suggestion }) => (
					<Card
						key={suggestion.id}
						className="w-56 p-4 border-transparent mb-1"
						style={{
							shadowColor: selectedTheme.primary,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 4,
						}}
					>
						<View className="gap-3">
							<View className="flex-row justify-between items-start">
								<View className="flex-1">
									<Text className="font-semibold text-base" numberOfLines={2}>
										{suggestion.title}
									</Text>
									<Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
										{suggestion.type}
									</Text>
								</View>
								<View
									className={`px-2 py-1 rounded-full ${
										suggestion.popularity === "High"
											? "bg-green-100 dark:bg-green-900"
											: "bg-blue-100 dark:bg-blue-900"
									}`}
								>
									<Text
										className={`text-xs font-medium ${
											suggestion.popularity === "High"
												? "text-green-700 dark:text-green-300"
												: "text-blue-700 dark:text-blue-300"
										}`}
									>
										{suggestion.popularity}
									</Text>
								</View>
							</View>
							<View className="flex-row justify-between items-center">
								<Text className="text-sm text-gray-500">
									{suggestion.category}
								</Text>
								<Text className="text-xs text-gray-400">Recommended</Text>
							</View>
						</View>
					</Card>
				)}
			/>
		</View>
	);
}
