import {
	BookOpen,
	HelpCircle,
	MessageCircleQuestion,
	Users,
	Video,
} from "lucide-react-native";
import { Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import HomeFeatureCard from "./home-feature-card";

export const communityInsight = [
	{
		id: "articles",
		title: "Articles",
		icon: BookOpen,
		href: "/articles",
	},
	{
		id: "reels",
		title: "Reels",
		icon: Video,
		href: "/reels",
	},
	{
		id: "community",
		title: "Community",
		icon: Users,
		href: "/(tabs)/explore",
	},
	{
		id: "help",
		title: "Help & Support",
		icon: HelpCircle,
		href: "/settings",
	},
];

export default function HomeCommunityInsights() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-2 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={MessageCircleQuestion}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Community & Insights</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-between gap-3 mx-4 py-2">
				{communityInsight.map((item) => (
					<HomeFeatureCard
						key={item.id}
						href={item.href}
						title={item.title}
						icon={item.icon}
					/>
				))}
			</View>
		</View>
	);
}
