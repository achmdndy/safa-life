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

const IMAGE_WIDTH = 350;

type OnboardingConnectedProps = ComponentProps<typeof Animated.View> & {
	animationProgress: SharedValue<number>;
};

export default function OnboardingConnected({
	animationProgress,
}: OnboardingConnectedProps) {
	const { t } = useTranslation("onboarding");
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const dimensions = useWindowDimensions();

	const careRef = useRef<RNText | null>(null);

	// Extract window dimensions to variables that can be used in worklets
	const windowWidth = dimensions.width;
	const careEndVal = 26 * 2;
	const imageEndVal = IMAGE_WIDTH * 4;

	const containerAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6, 0.8],
			[windowWidth, windowWidth, 0, -windowWidth, -windowWidth],
		);
		return {
			transform: [{ translateX }],
		};
	});

	const titleAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6, 0.8],
			[careEndVal, careEndVal, 0, -careEndVal, -careEndVal],
		);
		return {
			transform: [{ translateX }],
		};
	});

	const imageAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6],
			[imageEndVal, imageEndVal, 0, -imageEndVal],
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
		marginBottom: 20,
		alignSelf: "center" as const,
	};

	return (
		<Animated.View style={[containerStyle, containerAnimatedStyle]}>
			<View
				accessible={true}
				accessibilityRole="image"
				accessibilityLabel={t("connected.accessibility.image")}
			>
				<Animated.Image
					style={[imageStyle, imageAnimatedStyle]}
					source={AppImages.onboarding_connected}
				/>
			</View>
			<Animated.View style={titleAnimatedStyle}>
				<Text
					className="text-2xl md:text-3xl lg:text-4xl text-center font-bold py-2 px-4"
					style={{
						color: selectedTheme.primary,
						fontSize: Math.min(dimensions.width * 0.08, 32),
					}}
					ref={careRef}
					accessible={true}
					accessibilityRole="header"
					accessibilityLabel={t("connected.accessibility.title")}
				>
					{t("connected.title")}
				</Text>
			</Animated.View>
			<Text
				className="text-muted-foreground text-center px-6 md:px-8 lg:px-12"
				style={{
					fontSize: Math.min(dimensions.width * 0.04, 16),
					lineHeight: Math.min(dimensions.width * 0.06, 24),
				}}
				accessible={true}
				accessibilityRole="text"
				accessibilityLabel={t("connected.accessibility.subtitle")}
			>
				{t("connected.subtitle")}
			</Text>
		</Animated.View>
	);
}
