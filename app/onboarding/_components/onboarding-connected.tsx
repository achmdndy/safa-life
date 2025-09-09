import { type ComponentProps, useRef } from "react";
import {
	type Text as RNText,
	StyleSheet,
	useWindowDimensions,
} from "react-native";
import Animated, {
	interpolate,
	type SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { AppImages } from "@/assets/images";
import { Text } from "@/components/ui/text";

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 250;

type OnboardingConnectedProps = ComponentProps<typeof Animated.View> & {
	animationProgress: SharedValue<number>;
};

export function OnboardingConnected({
	animationProgress,
}: OnboardingConnectedProps) {
	const window = useWindowDimensions();

	const careRef = useRef<RNText | null>(null);

	// Extract window dimensions to variables that can be used in worklets
	const windowWidth = window.width;
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
			[0, 0.2, 0.4, 0.6, 0.8],
			[imageEndVal, imageEndVal, 0, -imageEndVal, -imageEndVal],
		);
		return {
			transform: [{ translateX }],
		};
	});

	return (
		<Animated.View style={[styles.container, containerAnimatedStyle]}>
			<Animated.Image
				style={[styles.image, imageAnimatedStyle]}
				source={AppImages.react_logo}
			/>
			<Animated.Text style={[styles.title, titleAnimatedStyle]} ref={careRef}>
				Care
			</Animated.Text>
			<Text style={styles.subtitle}>
				Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do eiusmod
				tempor incididunt ut labore
			</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		left: 0,
		right: 0,
		alignItems: "center",
		paddingBottom: 100,
	},
	image: {
		maxWidth: IMAGE_WIDTH,
		maxHeight: IMAGE_HEIGHT,
	},
	title: {
		color: "black",
		fontSize: 26,
		textAlign: "center",
		fontFamily: "WorkSans-Bold",
	},
	subtitle: {
		color: "black",
		textAlign: "center",
		fontFamily: "WorkSans-Regular",
		paddingHorizontal: 64,
		paddingVertical: 16,
	},
});
