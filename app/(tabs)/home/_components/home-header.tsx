import { useRouter } from "expo-router";
import { HeartHandshakeIcon, Search } from "lucide-react-native";
import type { ComponentProps } from "react";
import { Animated, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, SCROLL_DISTANCE } from "..";

export type HomeHeaderProps = ComponentProps<typeof View> & {
	value: Animated.Value;
};

export function HomeHeader({ value }: HomeHeaderProps) {
	const router = useRouter();

	const insets = useSafeAreaInsets();
	const { currentTheme, theme } = useTheme();
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);

	const animatedHeaderHight = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
		extrapolate: "clamp",
	});

	const animatedOpacity = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [1, 0],
		extrapolate: "clamp",
	});

	const animatedHeight = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [80, Platform.OS === "ios" ? 0 : 20],
		extrapolate: "clamp",
	});

	const animatedTranslateY = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [0, -100],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			className="pb-4 rounded-b-3xl px-4"
			style={{
				paddingTop: insets.top,
				height: animatedHeaderHight,
				backgroundColor: isDarkMode
					? themeColors.dark.card
					: themeColors.light.card,
				shadowColor: selectedTheme.primary,
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.1,
				shadowRadius: 8,
			}}
		>
			<Animated.View
				className="flex-row items-center justify-between"
				style={{
					opacity: animatedOpacity,
					height: animatedHeight,
					transform: [{ translateY: animatedTranslateY }],
				}}
			>
				<View>
					<Text
						className="text-white"
						style={{
							color: selectedTheme.primary,
						}}
					>
						Assalamu'alaikum,
					</Text>
					<Text
						className="font-bold text-lg"
						style={{
							color: selectedTheme.primary,
						}}
					>
						Achmad
					</Text>
				</View>

				<Button size="icon" variant="ghost">
					<HeartHandshakeIcon
						width={25}
						height={25}
						stroke={selectedTheme.primary}
					/>
				</Button>
			</Animated.View>

			<Button
				className="rounded-full bg-background justify-start"
				variant="outline"
				onPress={() => router.navigate("/search/home")}
			>
				<Icon as={Search} size={20} className="text-foreground" />
				<Text className="text-muted-foreground">Search for surah, dua...</Text>
			</Button>
		</Animated.View>
	);
}
