import {
	Award,
	BookOpen,
	Compass,
	Heart,
	Star,
	Target,
	TrendingUp,
} from "lucide-react-native";
import { Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import { HomeFeatureCard } from "./home-feature-card";

export const spiritualJourney = [
	{
		id: "spiritual-goals",
		title: "Spiritual Goals",
		icon: Target,
		href: "/spiritual/goals",
	},
	{
		id: "progress-tracker",
		title: "Progress Tracker",
		icon: TrendingUp,
		href: "/spiritual/progress",
	},
	{
		id: "achievements",
		title: "Achievements",
		icon: Award,
		href: "/spiritual/achievements",
	},
	{
		id: "islamic-learning",
		title: "Islamic Learning",
		icon: BookOpen,
		href: "/learning/courses",
	},
	{
		id: "good-deeds",
		title: "Good Deeds",
		icon: Heart,
		href: "/spiritual/deeds",
	},
	{
		id: "spiritual-level",
		title: "Spiritual Level",
		icon: Star,
		href: "/spiritual/level",
	},
];

export function HomeSpiritualJourney() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-2 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Compass}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Spiritual Journey</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-between gap-3 mx-4 py-2">
				{spiritualJourney.map((item) => (
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
