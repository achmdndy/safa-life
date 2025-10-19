import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Animated, type View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";
import {
	EXPLORE_HEADER_MAX_HEIGHT,
	EXPLORE_HEADER_MIN_HEIGHT,
	EXPLORE_SCROLL_DISTANCE,
} from "..";

export type ExploreHeaderProps = ComponentProps<typeof View> & {
	value: Animated.Value;
};

export function ExploreHeader({ value }: ExploreHeaderProps) {
	const router = useRouter();
	const { t } = useTranslation("explore");

	const insets = useSafeAreaInsets();
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	const animatedHeaderHeight = value.interpolate({
		inputRange: [0, EXPLORE_SCROLL_DISTANCE],
		outputRange: [EXPLORE_HEADER_MAX_HEIGHT, EXPLORE_HEADER_MIN_HEIGHT],
		extrapolate: "clamp",
	});

	const animatedTextOpacity = value.interpolate({
		inputRange: [
			0,
			EXPLORE_SCROLL_DISTANCE * 0.3,
			EXPLORE_SCROLL_DISTANCE * 0.6,
		],
		outputRange: [1, 0.5, 0],
		extrapolate: "clamp",
	});

	const animatedTextWidth = value.interpolate({
		inputRange: [
			0,
			EXPLORE_SCROLL_DISTANCE * 0.4,
			EXPLORE_SCROLL_DISTANCE * 0.8,
		],
		outputRange: [90, 50, 0],
		extrapolate: "clamp",
	});

	const animatedTextScale = value.interpolate({
		inputRange: [0, EXPLORE_SCROLL_DISTANCE * 0.5],
		outputRange: [1, 0.8],
		extrapolate: "clamp",
	});

	const animatedTextMargin = value.interpolate({
		inputRange: [0, EXPLORE_SCROLL_DISTANCE * 0.6],
		outputRange: [16, 0],
		extrapolate: "clamp",
	});

	const animatedButtonScale = value.interpolate({
		inputRange: [0, EXPLORE_SCROLL_DISTANCE * 0.3],
		outputRange: [1, 1.02],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			className="px-4 flex-row items-center pb-4 bg-background"
			style={{
				paddingTop: insets.top,
				height: animatedHeaderHeight,
			}}
			accessible={true}
			accessibilityRole="header"
			accessibilityLabel={t("header.accessibilityLabel")}
		>
			<Animated.View
				style={{
					opacity: animatedTextOpacity,
					width: animatedTextWidth,
					overflow: "hidden",
					transform: [{ scale: animatedTextScale }],
					marginRight: animatedTextMargin,
				}}
			>
				<Text
					className="text-2xl font-bold"
					style={{ color: selectedTheme.primary }}
				>
					{t("header.title")}
				</Text>
			</Animated.View>

			<Animated.View
				className="flex-1"
				style={{
					transform: [{ scale: animatedButtonScale }],
				}}
			>
				<Button
					className="rounded-full justify-start w-full"
					variant="outline"
					onPress={() => router.push("/search/explore")}
					accessible={true}
					accessibilityRole="button"
					accessibilityLabel={t("header.searchButtonAccessibilityLabel")}
					accessibilityHint={t("header.searchButtonAccessibilityHint")}
				>
					<Icon as={Search} size={20} stroke={selectedTheme.primary} />
					<Text className="text-muted-foreground">
						{t("header.searchPlaceholder")}
					</Text>
				</Button>
			</Animated.View>
		</Animated.View>
	);
}
