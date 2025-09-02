import { HeartHandshakeIcon, Search } from "lucide-react-native";
import type { ComponentProps } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, SCROLL_DISTANCE } from "..";

export type HomeHeaderProps = ComponentProps<typeof View> & {
	value: Animated.Value;
};

export function HomeHeader({ value }: HomeHeaderProps) {
	const insets = useSafeAreaInsets();

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
		outputRange: [80, 0],
		extrapolate: "clamp",
	});

	const animatedTranslateY = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [0, -100],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			className="bg-primary pb-4 rounded-b-3xl px-4"
			style={{
				paddingTop: insets.top,
				height: animatedHeaderHight,
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

			<Button className="rounded-full bg-white justify-start" variant="ghost">
				<Search width={20} height={20} />
				<Text className="text-muted-foreground">Search for surah, dua...</Text>
			</Button>
		</Animated.View>
	);
}
