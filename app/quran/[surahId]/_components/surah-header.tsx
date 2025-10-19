import { router } from "expo-router";
import { ArrowLeft, Info } from "lucide-react-native";
import { Animated, Pressable, Text, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";

export const HEADER_HEIGHT = 80;

interface SurahHeaderProps {
	surahId?: string;
	headerTranslateY: Animated.Value;
	topInset: number;
	onPressInfo: () => void;
}

export function SurahHeader({
	surahId,
	headerTranslateY,
	topInset,
	onPressInfo,
}: SurahHeaderProps) {
	const { currentTheme, theme } = useTheme();
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);

	return (
		<Animated.View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1,
				backgroundColor: isDarkMode
					? themeColors.dark.card
					: themeColors.light.card,
				height: HEADER_HEIGHT + topInset,
				transform: [{ translateY: headerTranslateY }],
				paddingTop: topInset,
				borderBottomWidth: 1,
				borderBottomColor: isDarkMode
					? themeColors.dark.border
					: themeColors.light.border,
			}}
		>
			<View className="flex-row items-center justify-between px-4 h-full">
				<Pressable
					onPress={() => router.back()}
					className="p-2 rounded-full active:bg-accent"
				>
					<Icon as={ArrowLeft} size={24} color={selectedTheme.primary} />
				</Pressable>
				<View className="absolute left-0 right-0 items-center justify-center h-full pointer-events-none">
					<Text className="text-xl font-bold text-foreground">
						Surah {surahId}
					</Text>
				</View>
				<View className="flex-row gap-2">
					<Pressable
						onPress={onPressInfo}
						className="p-2 rounded-full active:bg-accent"
					>
						<Icon as={Info} size={24} color={selectedTheme.primary} />
					</Pressable>
				</View>
			</View>
		</Animated.View>
	);
}
