import { Bell, Globe, Moon, Settings, Shield, User } from "lucide-react-native";
import { Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import { HomeFeatureCard } from "./home-feature-card";

export const settings = [
	{
		id: "app-settings",
		title: "App Settings",
		icon: Settings,
		href: "/(tabs)/settings",
	},
	{
		id: "notifications",
		title: "Notifications",
		icon: Bell,
		href: "/settings/notifications",
	},
	{
		id: "theme",
		title: "Theme",
		icon: Moon,
		href: "/settings/theme",
	},
	{
		id: "language",
		title: "Language",
		icon: Globe,
		href: "/settings/language",
	},
	{
		id: "privacy",
		title: "Privacy",
		icon: Shield,
		href: "/settings/privacy",
	},
	{
		id: "profile",
		title: "Profile",
		icon: User,
		href: "/(tabs)/profile",
	},
];

export function HomeSettings() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-2 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Settings}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Settings</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-between gap-3 mx-4 py-2">
				{settings.map((item) => (
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
