import { FlashList } from "@shopify/flash-list";
import { FileText, TrendingUp } from "lucide-react-native";
import { View } from "react-native";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

const topArticles = [
	{
		id: 1,
		title: "Understanding Surah Al-Fatiha",
		category: "Tafsir",
		views: "12.5K",
	},
	{
		id: 2,
		title: "The Importance of Prayer in Islam",
		category: "Worship",
		views: "8.2K",
	},
	{
		id: 3,
		title: "Stories of Prophet Muhammad SAW",
		category: "Seerah",
		views: "15.3K",
	},
	{
		id: 4,
		title: "The Five Pillars of Islam",
		category: "Basics",
		views: "9.7K",
	},
	{
		id: 5,
		title: "Ramadan: A Month of Reflection",
		category: "Spirituality",
		views: "11.1K",
	},
];

export default function ExploreArticles() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-4 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={FileText}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Top Articles</Text>
				</View>
				<View className="flex-row items-center">
					<Icon
						as={TrendingUp}
						size={16}
						className="mr-1"
						stroke={selectedTheme.secondary}
					/>
					<Text className="text-sm text-gray-500">Trending</Text>
				</View>
			</View>

			<FlashList
				data={topArticles}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 16 }}
				ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
				renderItem={({ item: article }) => (
					<Card
						className="w-64 p-4 border-transparent mb-1"
						style={{
							shadowColor: selectedTheme.primary,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 4,
						}}
					>
						<View className="gap-2">
							<Text className="font-semibold text-base" numberOfLines={2}>
								{article.title}
							</Text>
							<View className="flex-row justify-between items-center">
								<Text className="text-sm text-gray-600 dark:text-gray-400">
									{article.category}
								</Text>
								<Text className="text-xs text-gray-500">
									{article.views} views
								</Text>
							</View>
						</View>
					</Card>
				)}
			/>
		</View>
	);
}
