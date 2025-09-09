import { Moon, Sun } from "lucide-react-native";
import { Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/theme-context";

export function ThemeDarkMode() {
	const { currentTheme, themes, theme, toggleTheme } = useTheme();
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];

	return (
		<View className="px-4 mb-6">
			<View className="bg-card border border-border rounded-3xl p-4">
				<View className="flex-row items-center justify-between">
					<View className="flex-row items-center flex-1">
						<View
							className="w-12 h-12 bg-primary/10 rounded-2xl items-center justify-center mr-4"
							style={{ backgroundColor: `${selectedTheme.secondary}20` }}
						>
							<Icon
								as={isDarkMode ? Moon : Sun}
								size={20}
								stroke={selectedTheme.primary}
							/>
						</View>
						<View className="flex-1">
							<Text className="text-lg font-semibold text-foreground">
								Dark Mode
							</Text>
							<Text className="text-sm text-muted-foreground">
								Switch between light and dark theme
							</Text>
						</View>
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
			</View>
		</View>
	);
}
