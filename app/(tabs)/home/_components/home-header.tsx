import { HeartHandshakeIcon, Search } from "lucide-react-native";
import type { ComponentProps } from "react";
import { Animated, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, SCROLL_DISTANCE } from "..";
import { Icon } from "@/components/ui/icon";

export type HomeHeaderProps = ComponentProps<typeof View> & {
	value: Animated.Value;
};

export function HomeHeader({ value }: HomeHeaderProps) {
	const insets = useSafeAreaInsets();
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	const animatedHeaderHight = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
		extrapolate: "clamp",
	});

	const animatedOpacity = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [1, 0],
		extrapolate: "clamp",
	});

	const animatedHeight = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [80, Platform.OS === 'ios' ? 0 : 20],
		extrapolate: "clamp",
	});

	const animatedTranslateY = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [0, -100],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			className="pb-4 rounded-b-3xl px-4"
			style={{
				paddingTop: insets.top,
				height: animatedHeaderHight,
				backgroundColor: selectedTheme.primary,
			}}
		>
			<Animated.View
				className="flex-row items-center justify-between"
				style={{
					opacity: animatedOpacity,
					height: animatedHeight,
					transform: [{ translateY: animatedTranslateY }],
				}}
			>
				<View>
					<Text className="text-white">Assalamu'alaikum,</Text>
					<Text className="font-bold text-lg text-white">Achmad</Text>
				</View>

				<Button size="icon" variant="ghost">
					<HeartHandshakeIcon width={25} height={25} stroke={"white"} />
				</Button>
			</Animated.View>

			<Button className="rounded-full bg-background justify-start" variant="ghost">
				<Icon as={Search} size={20} className="text-foreground"/>
				<Text className="text-muted-foreground">Search for surah, dua...</Text>
			</Button>
		</Animated.View>
	);
}
