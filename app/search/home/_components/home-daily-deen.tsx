import {
	AlarmClock,
	BookOpen,
	Heart,
	MapPin,
	Moon,
	RotateCcw,
} from "lucide-react-native";
import { Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import HomeFeatureCard from "./home-feature-card";

export const dailyDeen = [
	{
		id: "prayer-times",
		title: "Prayer Times",
		icon: AlarmClock,
		href: "/(tabs)/home",
	},
	{
		id: "quran",
		title: "Quran",
		icon: BookOpen,
		href: "/(tabs)/quran",
	},
	{
		id: "duas",
		title: "Duas",
		icon: Heart,
		href: "/features/tasbih",
	},
	{
		id: "qibla",
		title: "Qibla",
		icon: MapPin,
		href: "/features/qibla",
	},
	{
		id: "khatam",
		title: "Khatam Quran",
		icon: RotateCcw,
		href: "/features/journal",
	},
	{
		id: "deen-mode",
		title: "Deen Mode",
		icon: Moon,
		href: "/settings/theme",
	},
];

export default function HomeDailyDeen() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-2 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={AlarmClock}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Daily Deen</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-between gap-3 mx-4 py-2">
				{dailyDeen.map((item) => (
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
