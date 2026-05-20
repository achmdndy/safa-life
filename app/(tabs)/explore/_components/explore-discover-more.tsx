import {
	ChevronRight,
	Compass,
	MapPin,
	MessageSquare,
	Newspaper,
	ScrollText,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

const discoverItems = [
	{
		id: 1,
		title: "Hadith & Sunnah",
		description: "Daily wisdom",
		icon: ScrollText,
	},
	{
		id: 2,
		title: "Articles",
		description: "Islamic knowledge",
		icon: Newspaper,
	},
	{
		id: 3,
		title: "Q&A",
		description: "Get answers",
		icon: MessageSquare,
	},
	{
		id: 4,
		title: "Halal Finder",
		description: "Find halal places",
		icon: MapPin,
	},
];

export default function ExploreDiscoverMore() {
	const { t } = useTranslation("explore");
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View
			className="gap-3 mt-8 px-4"
			accessible={true}
			accessibilityLabel={t("discoverMore.accessibilityLabel")}
		>
			<View className="flex-row justify-between items-center mb-1">
				<View className="flex-row items-center">
					<Icon
						as={Compass}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">{t("discoverMore.title")}</Text>
				</View>
				<Pressable
					className="flex-row items-center"
					accessible={true}
					accessibilityRole="button"
					accessibilityLabel={t("discoverMore.viewAllAccessibilityLabel")}
					accessibilityHint={t("discoverMore.viewAllAccessibilityHint")}
				>
					<Text className="text-sm mr-1">{t("discoverMore.viewAll")}</Text>
					<Icon as={ChevronRight} size={16} />
				</Pressable>
			</View>

			<View className="flex-row flex-wrap justify-between gap-3">
				{discoverItems.map((item) => {
					const itemKey =
						item.id === 1
							? "hadith"
							: item.id === 2
								? "articles"
								: item.id === 3
									? "qa"
									: "halalFinder";
					const title = t(`discoverMore.items.${itemKey}.title`);
					const description = t(`discoverMore.items.${itemKey}.description`);

					return (
						<Card
							key={item.id.toString()}
							className="p-2 border-transparent h-24 w-[48%]"
							style={{
								shadowColor: selectedTheme.primary,
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.1,
								shadowRadius: 4,
							}}
							accessible={true}
							accessibilityRole="button"
							accessibilityLabel={t("discoverMore.itemAccessibilityLabel", {
								title,
								description,
							})}
							accessibilityHint={t("discoverMore.itemAccessibilityHint", {
								title,
							})}
						>
							<CardContent className="p-0">
								<View className="flex-col items-center justify-center p-4 h-full">
									<View
										className="w-10 h-10 rounded-full items-center justify-center mb-2"
										style={{ backgroundColor: `${selectedTheme.secondary}20` }}
										hitSlop={8}
									>
										<Icon
											as={item.icon}
											size={20}
											stroke={selectedTheme.primary}
										/>
									</View>
									<Text className="font-semibold text-sm text-center text-gray-800 dark:text-foreground">
										{title}
									</Text>
									<Text className="text-gray-500 dark:text-foreground/50 text-xs text-center">
										{description}
									</Text>
								</View>
							</CardContent>
						</Card>
					);
				})}
			</View>
		</View>
	);
}
