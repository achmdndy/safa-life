import type { ComponentProps } from "react";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";
import Animated, {
	interpolate,
	type SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppImages } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

type OnboardingWelcome = ComponentProps<typeof Animated.View> & {
	onNextClick: () => void;
	animationProgress: SharedValue<number>;
};

export function OnboardingWelcome({
	onNextClick,
	animationProgress,
}: OnboardingWelcome) {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	const window = useWindowDimensions();
	const insets = useSafeAreaInsets();

	const windowHeight = window.height;
	const windowWidth = window.width;

	const welcomeAnimatedStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			animationProgress.value,
			[0, 0.2, 0.8],
			[0, -windowHeight, -windowHeight],
		);
		return {
			transform: [{ translateY }],
		};
	});

	const introImageData = Image.resolveAssetSource(AppImages.react_logo);

	return (
		<Animated.View className="flex-1" style={welcomeAnimatedStyle}>
			<ScrollView className="flex-grow-0" alwaysBounceVertical={false}>
				<View>
					<Image
						style={{
							width: windowWidth,
							height: undefined,
							aspectRatio: introImageData
								? introImageData.width / introImageData.height
								: 357 / 470,
						}}
						source={AppImages.react_logo}
					/>
				</View>
				<Text
					className="text-2xl text-center font-bold py-2"
					style={{
						color: selectedTheme.primary,
					}}
				>
					Clearhead
				</Text>
				<Text className="text-muted-foreground text-center px-6">
					Lorem ipsum dolor sit amet,consectetur{"\n"}adipiscing elit,sed do
					eiusmod tempor{"\n"}incididunt ut labore
				</Text>
			</ScrollView>

			<View
				className="flex-grow items-center justify-center pt-2"
				style={{ paddingBottom: 8 + insets.bottom }}
			>
				<Button
					size="lg"
					className="h-14 w-40"
					style={{ backgroundColor: selectedTheme.primary }}
					onPress={() => onNextClick()}
				>
					<Text className="text-lg">Let's begin</Text>
				</Button>
			</View>
		</Animated.View>
	);
}
