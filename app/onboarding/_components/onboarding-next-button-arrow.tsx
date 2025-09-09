import { ChevronRight } from "lucide-react-native";
import type { ComponentProps } from "react";
import { Pressable, View } from "react-native";
import Animated, {
	interpolate,
	type SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

type OnboardingNextButtonArrowProps = ComponentProps<typeof Animated.View> & {
	onBtnPress: () => void;
	animationProgress: SharedValue<number>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function OnboardingNextButtonArrow({
	onBtnPress,
	animationProgress,
}: OnboardingNextButtonArrowProps) {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	const buttonAnimatedStyle = useAnimatedStyle(() => {
		const width = interpolate(
			animationProgress.value,
			[0, 0.7, 0.8],
			[58, 58, 258],
		);
		const borderRadius = interpolate(
			animationProgress.value,
			[0, 0.7, 0.8],
			[29, 29, 8],
		);

		return {
			width,
			borderRadius,
			backgroundColor: selectedTheme.primary,
		};
	});

	const signupAnimatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(animationProgress.value, [0.75, 0.8], [0, 1]);
		const translateY = interpolate(
			animationProgress.value,
			[0.75, 0.8],
			[20, 0],
		);

		return {
			opacity,
			transform: [{ translateY }],
		};
	});

	const chevronAnimatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			animationProgress.value,
			[0, 0.75, 0.8, 1],
			[1, 1, 1, 1],
			{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
		);

		const translateX = interpolate(
			animationProgress.value,
			[0.75, 0.8],
			[0, 52],
			{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
		);

		return {
			opacity,
			transform: [{ translateX }],
		};
	});

	return (
		<AnimatedPressable
			onPress={onBtnPress}
			className="h-[58px] shadow-lg elevation-3 overflow-hidden justify-center items-center relative"
			style={buttonAnimatedStyle}
		>
			<Animated.View
				className="flex-row justify-center items-center px-4 absolute inset-0"
				style={signupAnimatedStyle}
			>
				<Text className="text-lg font-semibold text-white mr-2">
					Get Started
				</Text>
				<View className="w-5 h-5" />
			</Animated.View>

			<Animated.View style={chevronAnimatedStyle}>
				<ChevronRight size={24} color="white" strokeWidth={2.5} />
			</Animated.View>
		</AnimatedPressable>
	);
}
