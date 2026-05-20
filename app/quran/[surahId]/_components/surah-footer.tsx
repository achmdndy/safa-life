import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
	Pause,
	Play,
	SkipBack,
	SkipForward,
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
	onNextSurah: () => void;
	onPrevSurah: () => void;
	onPressSettings: () => void;
	settingsSheetRef: React.RefObject<BottomSheetModal>;
	isPlaying?: boolean;
}

export default function SurahFooter({
	footerTranslateY,
	onPlayAudio,
	onNextVerse,
	onPrevVerse,
	onNextSurah,
	onPrevSurah,
	onPressSettings,
	isPlaying,
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
				{/* Left: Previous (surah or verse depending on state) */}
				<Pressable
					onPress={isPlaying ? onPrevVerse : onPrevSurah}
					className="p-2 rounded-full active:bg-accent"
					accessibilityLabel={isPlaying ? "Previous verse" : "Previous surah"}
				>
					<Icon
						as={isPlaying ? SkipBack : ChevronLeft}
						size={26}
						color={selectedTheme.primary}
					/>
				</Pressable>

				{/* Center: Play/Pause (same position) */}
				<Pressable
					onPress={onPlayAudio}
					className="p-3 rounded-full active:bg-accent"
					accessibilityLabel={isPlaying ? "Pause" : "Play"}
				>
					<Icon
						as={isPlaying ? Pause : Play}
						size={28}
						color={selectedTheme.primary}
					/>
				</Pressable>

				{/* Right: Next (surah or verse depending on state) */}
				<Pressable
					onPress={isPlaying ? onNextVerse : onNextSurah}
					className="p-2 rounded-full active:bg-accent"
					accessibilityLabel={isPlaying ? "Next verse" : "Next surah"}
				>
					<Icon
						as={isPlaying ? SkipForward : ChevronRight}
						size={26}
						color={selectedTheme.primary}
					/>
				</Pressable>

				{/* Settings */}
				<Pressable
					onPress={onPressSettings}
					className="p-2 rounded-full active:bg-accent"
					accessibilityLabel="Settings"
				>
					<Icon as={MoreHorizontal} size={24} color={selectedTheme.primary} />
				</Pressable>
			</View>
		</Animated.View>
	);
}
