import { useRef } from "react";
import { Animated, Platform, ScrollView, View } from "react-native";
import { ExploreHeader } from "./_components/explore-header";
import { ExploreReels } from "./_components/explore-reels";
import { ExploreHijrahProgram } from "./_components/explore-hijrah-program";
import { ExploreEvent } from "./_components/explore-event";
import { ExploreDiscoverMore } from "./_components/explore-discover-more";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const EXPLORE_HEADER_MAX_HEIGHT = 120;
export const EXPLORE_HEADER_MIN_HEIGHT = 110;
export const EXPLORE_SCROLL_DISTANCE = EXPLORE_HEADER_MAX_HEIGHT - EXPLORE_HEADER_MIN_HEIGHT;

export default function ExploreScreen() {
	const scrollOffsetY = useRef(new Animated.Value(0)).current;
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-background h-full">
			<ExploreHeader value={scrollOffsetY} />
			<ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? insets.bottom + 70 : 20 }}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
					{
						useNativeDriver: false,
					},
				)}
			>
				<ExploreReels/>
				<ExploreHijrahProgram/>
				<ExploreEvent/>
				<ExploreDiscoverMore/>
			</ScrollView>
		</View>
	);
}
