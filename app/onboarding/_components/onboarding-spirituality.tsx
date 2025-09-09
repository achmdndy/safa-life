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

type OnboardingSpiritualityProps = ComponentProps<typeof Animated.View> & {
	animationProgress: SharedValue<number>;
};

export function OnboardingSpirituality({
	animationProgress,
}: OnboardingSpiritualityProps) {
	const window = useWindowDimensions();

	const relaxRef = useRef<RNText | null>(null);

	// Extract window dimensions to variables that can be used in worklets
	const windowWidth = window.width;

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

	return (
		<Animated.View style={[styles.container, containerAnimatedStyle]}>
			<Animated.Text style={[styles.title, titleAnimatedStyle]} ref={relaxRef}>
				Relax
			</Animated.Text>
			<Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>
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
