import { Tabs } from "expo-router";
import { BookOpen, HandHeart, Home, Play, User } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";

export default function TabLayout() {
	const { currentTheme, theme } = useTheme();
	const { t } = useTranslation("tabs");
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);

	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
				tabBarLabelStyle: {
					marginTop: 6,
					fontSize: 12,
				},
				tabBarActiveTintColor: selectedTheme.primary,
				tabBarInactiveTintColor: "#A1A1A1",
				tabBarStyle: [
					Platform.select({
						ios: {
							position: "absolute",
						},
						default: {},
					}),
					{
						borderTopWidth: 0,
						backgroundColor: isDarkMode
							? themeColors.dark.card
							: themeColors.light.card,
						paddingTop: 4,
					},
				],
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: t("titles.home"),
					tabBarIcon: ({ color }) => (
						<Home width={25} height={25} stroke={color} />
					),
					tabBarAccessibilityLabel: t("accessibility.home.label"),
				}}
			/>
			<Tabs.Screen
				name="quran"
				options={{
					title: t("titles.quran"),
					tabBarIcon: ({ color }) => (
						<BookOpen width={25} height={25} stroke={color} />
					),
					tabBarAccessibilityLabel: t("accessibility.quran.label"),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: t("titles.explore"),
					tabBarIcon: ({ color }) => (
						<Play width={25} height={25} stroke={color} />
					),
					tabBarAccessibilityLabel: t("accessibility.explore.label"),
				}}
			/>
			<Tabs.Screen
				name="charity"
				options={{
					title: t("titles.charity"),
					tabBarIcon: ({ color }) => (
						<HandHeart width={25} height={25} stroke={color} />
					),
					tabBarAccessibilityLabel: t("accessibility.charity.label"),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: t("titles.profile"),
					tabBarIcon: ({ color }) => (
						<User width={25} height={25} stroke={color} />
					),
					tabBarAccessibilityLabel: t("accessibility.profile.label"),
				}}
			/>
		</Tabs>
	);
}
