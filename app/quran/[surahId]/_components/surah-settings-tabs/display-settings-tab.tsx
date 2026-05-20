import { Moon, Sun } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { type ThemeVariant, themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";

export default function DisplaySettingsTab() {
	const { currentTheme, setTheme, theme, toggleTheme } = useTheme();
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);

	const [viewMode, setViewMode] = useState("list");

	const viewModeOptions = [
		{ key: "list", label: "List View" },
		{ key: "page", label: "Page View" },
	];

	return (
		<View className="py-4">
			<Text className="text-lg font-semibold mb-2">View Mode</Text>
			<Text className="text-muted-foreground mb-4">
				Choose your preferred way to view the Quran.
			</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ gap: 12 }}
				className="flex-1"
			>
				{viewModeOptions.map((option) => {
					const isSelected = viewMode === option.key;
					return (
						<Pressable
							key={option.key}
							onPress={() => setViewMode(option.key)}
							className="items-center justify-center p-4 rounded-2xl"
							android_ripple={{ color: `${selectedTheme.secondary}40` }}
							style={[
								{
									backgroundColor: isDarkMode
										? themeColors.dark.card
										: themeColors.light.card,
									borderWidth: 2,
									borderColor: isSelected
										? selectedTheme.primary
										: "transparent",
									minWidth: 100,
								},
							]}
						>
							<View
								className="w-10 h-10 rounded-2xl items-center justify-center mb-3"
								style={{
									backgroundColor: isSelected
										? selectedTheme.primary
										: `${selectedTheme.secondary}20`,
								}}
							>
								<Text
									className="text-xs font-semibold capitalize"
									style={{
										color: isSelected
											? themeColors.dark.card
											: selectedTheme.primary,
									}}
								>
									{option.key === "list" ? "List" : "Page"}
								</Text>
							</View>
							<Text
								className="text-xs font-semibold capitalize"
								style={{
									color: isSelected
										? selectedTheme.primary
										: isDarkMode
											? themeColors.dark.foreground
											: themeColors.light.foreground,
								}}
							>
								{option.label}
							</Text>
						</Pressable>
					);
				})}
			</ScrollView>
			<Separator className="my-4" />
			<Text className="text-lg font-semibold mb-2">Dark Mode</Text>
			<Text className="text-muted-foreground mb-4">
				Switch between light and dark theme.
			</Text>
			<View className="flex-row items-center justify-between mb-4">
				<View className="flex-row items-center flex-1">
					<View
						className="w-10 h-10 rounded-2xl items-center justify-center mr-4"
						style={{ backgroundColor: `${selectedTheme.secondary}20` }}
					>
						<Icon
							as={isDarkMode ? Moon : Sun}
							size={20}
							stroke={selectedTheme.primary}
						/>
					</View>
					<Text className="text-base font-semibold text-foreground">
						{isDarkMode ? "Dark" : "Light"}
					</Text>
				</View>
				<Switch
					checked={isDarkMode}
					onCheckedChange={toggleTheme}
					className="ml-4"
					style={{
						backgroundColor: isDarkMode
							? selectedTheme.primary
							: `${selectedTheme.secondary}20`,
					}}
				/>
			</View>
			<Separator className="my-4" />
			<Text className="text-lg font-semibold mb-2">Theme</Text>
			<Text className="text-muted-foreground mb-4">
				Select your preferred color scheme for the app.
			</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ gap: 12 }}
				className="flex-1"
			>
				{Object.entries(themes).map(([key, themeOption]) => {
					const isSelected = currentTheme === key;
					return (
						<Pressable
							key={key}
							onPress={() => setTheme(key as ThemeVariant)}
							className="items-center justify-center p-4 rounded-2xl"
							android_ripple={{ color: `${themeOption.secondary}40` }}
							style={[
								{
									backgroundColor: isDarkMode
										? themeColors.dark.card
										: themeColors.light.card,
									borderWidth: 2,
									borderColor: isSelected ? themeOption.primary : "transparent",
									minWidth: 100,
								},
							]}
						>
							<View className="flex-row mb-3">
								<View
									className="w-10 h-10 rounded-2xl border-3"
									style={{
										backgroundColor: themeOption.primary,
										transform: [{ scale: isSelected ? 1.1 : 1 }],
									}}
								/>
								<View
									className="w-10 h-10 rounded-2xl border-3 -ml-4"
									style={{
										backgroundColor: themeOption.secondary,
										transform: [{ scale: isSelected ? 1.1 : 1 }],
									}}
								/>
							</View>

							<Text
								className="text-xs font-semibold capitalize"
								style={{
									color: isSelected
										? themeOption.primary
										: isDarkMode
											? themeColors.dark.foreground
											: themeColors.light.foreground,
								}}
							>
								{key}
							</Text>
						</Pressable>
					);
				})}
			</ScrollView>
		</View>
	);
}
