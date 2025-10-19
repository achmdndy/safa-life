import { type ComponentProps, useRef } from "react";
import { useTranslation } from "react-i18next";
import { type Text as RNText, useWindowDimensions, View } from "react-native";
import Animated, {
	interpolate,
	type SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { AppImages } from "@/assets/images";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

type OnboardingSpiritualityProps = ComponentProps<typeof Animated.View> & {
	animationProgress: SharedValue<number>;
};

export function OnboardingSpirituality({
	animationProgress,
}: OnboardingSpiritualityProps) {
	const { t } = useTranslation("onboarding");
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const dimensions = useWindowDimensions();

	const careRef = useRef<RNText | null>(null);

	// Extract window dimensions to variables that can be used in worklets
	const windowWidth = dimensions.width;

	const containerAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.8],
			[0, 0, -windowWidth, -windowWidth],
		);
		return {
			transform: [{ translateX }],
		};
	});

	const titleAnimatedStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			animationProgress.value,
			[0, 0.2, 0.8],
			[-(26 * 2), 0, 0],
		);
		return {
			transform: [{ translateY }],
		};
	});

	const subtitleAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6, 0.8],
			[0, 0, -windowWidth * 2, 0, 0],
		);
		return {
			transform: [{ translateX }],
		};
	});

	const imageAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6, 0.8],
			[0, 0, -350 * 4, 0, 0],
		);
		return {
			transform: [{ translateX }],
		};
	});

	// Create dynamic styles based on window dimensions
	const containerStyle = {
		position: "absolute" as const,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: "center" as const,
		justifyContent: "center" as const,
		paddingHorizontal: Math.max(20, dimensions.width * 0.05),
		paddingBottom: Math.max(100, dimensions.height * 0.12),
		paddingTop: Math.max(20, dimensions.height * 0.05),
	};

	const imageStyle = {
		width: "100%" as const,
		maxWidth: Math.min(350, dimensions.width * 0.8),
		height: undefined,
		aspectRatio: 1,
		marginTop: 20,
		alignSelf: "center" as const,
	};

	return (
		<Animated.View style={[containerStyle, containerAnimatedStyle]}>
			<Animated.View style={titleAnimatedStyle}>
				<Text
					className="text-2xl md:text-3xl lg:text-4xl text-center font-bold py-2 px-4"
					style={{
						color: selectedTheme.primary,
						fontSize: Math.max(24, Math.min(32, dimensions.width * 0.08)),
						lineHeight: Math.max(28, Math.min(38, dimensions.width * 0.095)),
					}}
					ref={careRef}
					accessible={true}
					accessibilityRole="header"
					accessibilityLabel={t("spirituality.accessibility.title")}
				>
					{t("spirituality.title")}
				</Text>
			</Animated.View>
			<Animated.View style={subtitleAnimatedStyle}>
				<Text
					className="text-center text-base text-muted-foreground px-4 md:px-8 lg:px-12 md:text-lg lg:text-xl"
					style={{
						fontSize: Math.max(14, Math.min(18, dimensions.width * 0.045)),
						lineHeight: Math.max(18, Math.min(24, dimensions.width * 0.055)),
					}}
					accessible={true}
					accessibilityRole="text"
					accessibilityLabel={t("spirituality.accessibility.subtitle")}
				>
					{t("spirituality.subtitle")}
				</Text>
			</Animated.View>
			<View
				accessible={true}
				accessibilityRole="image"
				accessibilityLabel={t("spirituality.accessibility.image")}
			>
				<Animated.Image
					style={[imageStyle, imageAnimatedStyle]}
					source={AppImages.onboarding_spirituality}
				/>
			</View>
		</Animated.View>
	);
}
