import { useRef } from "react";
import { Animated, Platform, ScrollView, View } from "react-native";
import { HomeArticles } from "./_components/home-articles";
import { HomeFeatures } from "./_components/home-features";
import { HomeHadith } from "./_components/home-hadith";
import { HomeHeader } from "./_components/home-header";
import { HomePrayerTimes } from "./_components/home-prayer-times";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HEADER_MAX_HEIGHT = Platform.OS === 'ios' ? 195 : 160;
export const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 115 : 100;
export const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function HomeScreen() {
	const scrollOffsetY = useRef(new Animated.Value(0)).current;
	const insets = useSafeAreaInsets()

	return (
		<View className="bg-background flex-1 h-full" style={{paddingBottom: Platform.OS === 'ios'? insets.bottom : 0}}>
			<HomeHeader value={scrollOffsetY} />
			<ScrollView
				scrollEventThrottle={5}
				contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 70 : 20 }}
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
