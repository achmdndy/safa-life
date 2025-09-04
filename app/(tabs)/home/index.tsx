import { useRef } from "react";
import { Animated, ScrollView, View } from "react-native";
import { HomeArticles } from "./_components/home-articles";
import { HomeFeatures } from "./_components/home-features";
import { HomeHadith } from "./_components/home-hadith";
import { HomeHeader } from "./_components/home-header";
import { HomePrayerTimes } from "./_components/home-prayer-times";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HEADER_MAX_HEIGHT = 195;
export const HEADER_MIN_HEIGHT = 115;
export const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function HomeScreen() {
	const scrollOffsetY = useRef(new Animated.Value(0)).current;
	const insets = useSafeAreaInsets()

	return (
		<View className="bg-background flex-1" style={{paddingBottom: insets.bottom}}>
			<HomeHeader value={scrollOffsetY} />
			<ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 70 }}
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
