import {
	BookOpen,
	Calendar,
	MapPin,
	Navigation,
	PanelTopDashed,
	Plane,
	Users,
} from "lucide-react-native";
import { Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import HomeFeatureCard from "./home-feature-card";

export const pilgrimage = [
	{
		id: "hajj-guide",
		title: "Hajj Guide",
		icon: BookOpen,
		href: "/pilgrimage/hajj",
	},
	{
		id: "umrah-guide",
		title: "Umrah Guide",
		icon: MapPin,
		href: "/pilgrimage/umrah",
	},
	{
		id: "pilgrimage-planner",
		title: "Pilgrimage Planner",
		icon: Calendar,
		href: "/pilgrimage/planner",
	},
	{
		id: "travel-guide",
		title: "Travel Guide",
		icon: Plane,
		href: "/pilgrimage/travel",
	},
	{
		id: "group-pilgrimage",
		title: "Group Pilgrimage",
		icon: Users,
		href: "/pilgrimage/group",
	},
	{
		id: "qibla-finder",
		title: "Qibla Finder",
		icon: Navigation,
		href: "/features/qibla",
	},
];

export default function HomePilgrimage() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-2 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={PanelTopDashed}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Pilgrimage</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-between gap-3 mx-4 py-2">
				{pilgrimage.map((item) => (
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
