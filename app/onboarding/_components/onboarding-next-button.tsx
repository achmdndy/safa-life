import { Link } from "expo-router";
import { type ComponentProps, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Animated, {
	Easing,
	interpolate,
	interpolateColor,
	runOnJS,
	type SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { useTheme } from "../../../contexts/theme-context";
import { OnboardingNextButtonArrow } from "./onboarding-next-button-arrow";

interface DotIndicatorProps {
	index: number;
	selectedIndex: number;
}

export function DotIndicator({ index, selectedIndex }: DotIndicatorProps) {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];
	const activeIndex = useSharedValue(0);

	useEffect(() => {
		activeIndex.value = withTiming(index === selectedIndex ? 1 : 0, {
			duration: 480,
			easing: Easing.out(Easing.exp), // easing biar lebih halus
		});
	}, [selectedIndex, index, activeIndex]);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(activeIndex.value, [0, 1], [1, 1.4]);
		const opacity = interpolate(activeIndex.value, [0, 1], [0.4, 1]);

		const backgroundColor = interpolateColor(
			activeIndex.value,
			[0, 1],
			["#e3e4e4", selectedTheme.secondary],
		);

		return {
			backgroundColor,
			transform: [{ scale }],
			opacity,
		};
	});

	return (
		<Animated.View
			className="w-[10px] h-[10px] rounded-[5px] m-1"
			style={animatedStyle}
		/>
	);
}

type OnboardingNextButtonProps = ComponentProps<typeof Animated.View> & {
	onNextClick: () => void;
	animationProgress: SharedValue<number>;
};

export function OnboardingNextButton({
	onNextClick,
	animationProgress,
}: OnboardingNextButtonProps) {
	const { t } = useTranslation("onboarding");
	const opacity = useSharedValue(0);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const { bottom } = useSafeAreaInsets();
	const paddingBottom = 16 + bottom;

	const dots = useMemo(() => [0, 1, 2, 3], []);

	// Use useDerivedValue for better performance
	useDerivedValue(() => {
		const value = animationProgress.value;
		const isVisible = value >= 0.2 && value <= 0.6;

		opacity.value = withTiming(isVisible ? 1 : 0, { duration: 480 });

		let newIndex = 0;
		if (value >= 0.7) {
			newIndex = 3;
		} else if (value >= 0.5) {
			newIndex = 2;
		} else if (value >= 0.3) {
			newIndex = 1;
		} else if (value >= 0.1) {
			newIndex = 0;
		}

		runOnJS(setSelectedIndex)(newIndex);
	}, [animationProgress]);

	const containerAnimatedStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6, 0.8],
			[96 * 5, 0, 0, 0, 0],
		);
		return {
			transform: [{ translateY }],
		};
	});

	const dotsAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	const footerTextAnimatedStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6, 0.8],
			[30 * 5, 30 * 5, 30 * 5, 30 * 5, 0],
		);
		return {
			transform: [{ translateY }],
		};
	});

	return (
		<Animated.View
			className="items-center absolute bottom-0 left-0 right-0"
			style={[{ paddingBottom }, containerAnimatedStyle]}
			// accessible={true}
			// accessibilityRole="none"
			// accessibilityLabel={t("navigation.accessibility.container")}
		>
			<Animated.View
				className="flex-row mb-4"
				style={dotsAnimatedStyle}
				accessible={true}
				accessibilityRole="none"
				accessibilityLabel={t("navigation.accessibility.dots")}
			>
				{dots.map((item) => (
					<DotIndicator key={item} index={item} selectedIndex={selectedIndex} />
				))}
			</Animated.View>

			<OnboardingNextButtonArrow
				animationProgress={animationProgress}
				onBtnPress={onNextClick}
			/>

			<Animated.View
				className="flex-row mt-2"
				style={footerTextAnimatedStyle}
				accessible={true}
				accessibilityRole="none"
				accessibilityLabel={t("navigation.accessibility.footer")}
			>
				<Text
					className="text-gray-500"
					accessible={true}
					accessibilityRole="text"
					accessibilityLabel={t("navigation.accessibility.accountQuestion")}
				>
					{t("navigation.accountQuestion")}
				</Text>
				<Link
					href={"/login"}
					className="text-[#132137] text-base font-bold"
					accessible={true}
					accessibilityRole="button"
					accessibilityLabel={t("navigation.accessibility.loginButton")}
				>
					<Text>{t("navigation.loginButton")}</Text>
				</Link>
			</Animated.View>
		</Animated.View>
	);
}
