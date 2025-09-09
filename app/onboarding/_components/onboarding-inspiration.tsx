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

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 250;

type OnboardingInspirationProps = ComponentProps<typeof Animated.View> & {
	animationProgress: SharedValue<number>;
};

export function OnboardingInspiration({
	animationProgress,
}: OnboardingInspirationProps) {
	const window = useWindowDimensions();

	const careRef = useRef<RNText | null>(null);

	// Extract window dimensions to variables that can be used in worklets
	const windowWidth = window.width;
	const textEndVal = windowWidth * 2;
	const imageEndVal = IMAGE_WIDTH * 4;

	const slideAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.4, 0.6, 0.8],
			[windowWidth, windowWidth, 0, -windowWidth],
		);
		return {
			transform: [{ translateX }],
		};
	});

	const textAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.4, 0.6, 0.8],
			[textEndVal, textEndVal, 0, -textEndVal],
		);
		return {
			transform: [{ translateX }],
		};
	});

	const imageAnimatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animationProgress.value,
			[0, 0.4, 0.6, 0.8],
			[imageEndVal, imageEndVal, 0, -imageEndVal],
		);
		return {
			transform: [{ translateX }],
		};
	});

	return (
		<Animated.View style={[styles.container, slideAnimatedStyle]}>
			<Animated.Text style={styles.title} ref={careRef}>
				Mood Dairy
			</Animated.Text>
			<Animated.Text style={[styles.subtitle, textAnimatedStyle]}>
				Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do eiusmod
				tempor incididunt ut labore
			</Animated.Text>
			<Animated.Image
				style={[styles.image, imageAnimatedStyle]}
				source={AppImages.react_logo}
			/>
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
	image: {
		maxWidth: IMAGE_WIDTH,
		maxHeight: IMAGE_HEIGHT,
	},
});
