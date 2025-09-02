import { useRef } from "react";
import { Animated, ScrollView, View } from "react-native";
import { HomeArticles } from "./_components/home-articles";
import { HomeFeatures } from "./_components/home-features";
import { HomeHadith } from "./_components/home-hadith";
import { HomeHeader } from "./_components/home-header";
import { HomePrayerTimes } from "./_components/home-prayer-times";

export const HEADER_MAX_HEIGHT = 195;
export const HEADER_MIN_HEIGHT = 115;
export const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function HomeScreen() {
	const scrollOffsetY = useRef(new Animated.Value(0)).current;

	return (
		<View className="bg-background h-full">
			<HomeHeader value={scrollOffsetY} />
			<ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
					{
						useNativeDriver: false,
					},
				)}
			>
				<HomeHadith />
				<HomePrayerTimes />
				<HomeFeatures />
				<HomeArticles />
			</ScrollView>
		</View>
	);
}
