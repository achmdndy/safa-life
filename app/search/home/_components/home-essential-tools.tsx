import {
	Calculator,
	Calendar,
	CheckCircle,
	DollarSign,
	Heart,
	Sparkles,
} from "lucide-react-native";
import { Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import { HomeFeatureCard } from "./home-feature-card";

export const essentialTools = [
	{
		id: "zakat-calculator",
		title: "Zakat Calculator",
		icon: Calculator,
		href: "/almsgiving/zakat",
	},
	{
		id: "halal-checker",
		title: "Halal Checker",
		icon: CheckCircle,
		href: "/features/halal",
	},
	{
		id: "islamic-calendar",
		title: "Islamic Calendar",
		icon: Calendar,
		href: "/(tabs)/home",
	},
	{
		id: "charity",
		title: "Charity",
		icon: Heart,
		href: "/(tabs)/charity",
	},
	{
		id: "sadaqah",
		title: "Sadaqah",
		icon: DollarSign,
		href: "/almsgiving/sadaqah",
	},
	{
		id: "infaq",
		title: "Infaq",
		icon: Sparkles,
		href: "/almsgiving/infaq",
	},
];

export function HomeEssentialTools() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-2 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Calculator}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Essential Tools</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-between gap-3 mx-4 py-2">
				{essentialTools.map((item) => (
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
