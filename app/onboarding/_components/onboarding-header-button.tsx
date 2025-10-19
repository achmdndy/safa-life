import { ChevronLeft } from "lucide-react-native";
import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StatusBar } from "react-native";
import Animated, {
	interpolate,
	type SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

type OnboardingHeaderButtonProps = ComponentProps<typeof Animated.View> & {
	onBackClick: () => void;
	onSkipClick: () => void;
	animationProgress: SharedValue<number>;
};

export function OnboardingHeaderButton({
	onBackClick,
	onSkipClick,
	animationProgress,
}: OnboardingHeaderButtonProps) {
	const { t } = useTranslation("onboarding");
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	const { top } = useSafeAreaInsets();
	const marginTop = Platform.OS === "ios" ? top : StatusBar.currentHeight;

	const containerAnimatedStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6, 0.8],
			[-(58 + (marginTop ?? 0)), 0, 0, 0, 0],
		);
		return {
			transform: [{ translateY }],
		};
	});

	const skipAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6, 0.8],
			[0, 0, 0, 0, 80],
		);
		return {
			transform: [{ translateX }],
		};
	});

	return (
		<Animated.View
			className="h-[58px] flex-row items-center justify-between pl-2 pr-4 absolute top-0 left-0 right-0"
			style={[
				{
					marginTop,
					zIndex: 1000,
					elevation: 1000,
					pointerEvents: "box-none",
				},
				containerAnimatedStyle,
			]}
			// accessible={true}
			// accessibilityRole="none"
			// accessibilityLabel={t("navigation.accessibility.header")}
		>
			<Button
				variant="ghost"
				size="icon"
				className="w-14 h-14 rounded-full"
				style={{ pointerEvents: "auto" }}
				onPress={() => onBackClick()}
				accessible={true}
				accessibilityRole="button"
				accessibilityLabel={t("navigation.accessibility.backButton")}
				accessibilityHint={t("navigation.accessibility.backButtonHint")}
			>
				<Icon as={ChevronLeft} size={24} stroke={selectedTheme.primary} />
			</Button>

			<Animated.View
				style={[skipAnimatedStyle, { pointerEvents: "auto" }]}
				accessible={true}
				accessibilityRole="none"
				accessibilityLabel={t("navigation.accessibility.skipContainer")}
			>
				<Button
					variant="ghost"
					style={{ pointerEvents: "auto" }}
					onPress={() => onSkipClick()}
					accessible={true}
					accessibilityRole="button"
					accessibilityLabel={t("navigation.accessibility.skipButton")}
					accessibilityHint={t("navigation.accessibility.skipButtonHint")}
				>
					<Text
						style={{ color: selectedTheme.primary }}
						accessible={true}
						accessibilityRole="text"
						accessibilityLabel={t("navigation.accessibility.skipText")}
					>
						{t("navigation.skipButton")}
					</Text>
				</Button>
			</Animated.View>
		</Animated.View>
	);
}
