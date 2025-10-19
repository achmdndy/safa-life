import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
	Play,
} from "lucide-react-native";
import { Animated, Pressable, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";

export const FOOTER_HEIGHT = 100;

interface SurahFooterProps {
	footerTranslateY: Animated.Value;
	onPlayAudio: () => void;
	onNextVerse: () => void;
	onPrevVerse: () => void;
	onPressSettings: () => void;
	settingsSheetRef: React.RefObject<BottomSheetModal>;
}

export function SurahFooter({
	footerTranslateY,
	onPlayAudio,
	onNextVerse,
	onPrevVerse,
	onPressSettings,
}: SurahFooterProps) {
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
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 1,
				backgroundColor: isDarkMode
					? themeColors.dark.card
					: themeColors.light.card,
				height: FOOTER_HEIGHT,
				transform: [{ translateY: footerTranslateY }],
				borderTopWidth: 1,
				borderTopColor: isDarkMode
					? themeColors.dark.border
					: themeColors.light.border,
			}}
		>
			<View className="flex-1 flex-row items-center justify-around px-4">
				<Pressable
					onPress={onPlayAudio}
					className="p-2 rounded-full active:bg-accent"
				>
					<Icon as={Play} size={24} color={selectedTheme.primary} />
				</Pressable>
				<Pressable
					onPress={onPrevVerse}
					className="p-2 rounded-full active:bg-accent"
				>
					<Icon as={ChevronLeft} size={24} color={selectedTheme.primary} />
				</Pressable>
				<Pressable
					onPress={onNextVerse}
					className="p-2 rounded-full active:bg-accent"
				>
					<Icon as={ChevronRight} size={24} color={selectedTheme.primary} />
				</Pressable>
				<Pressable
					onPress={onPressSettings}
					className="p-2 rounded-full active:bg-accent"
				>
					<Icon as={MoreHorizontal} size={24} color={selectedTheme.primary} />
				</Pressable>
			</View>
		</Animated.View>
	);
}
