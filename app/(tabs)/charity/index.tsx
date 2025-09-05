import { useRef } from "react";
import { Animated, View } from "react-native";
import { ChairityHeader } from "./_components/charity-header";
import { ChairityGivePurpose } from "./_components/chairity-give-purpose";
import { ChairityCalculateZakat } from "./_components/chairity-calculate-zakat";
import { ChairityCommunity } from "./_components/chairity-community";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

export const CHARITY_HEADER_MAX_HEIGHT = 180;
export const CHARITY_HEADER_MIN_HEIGHT = 110;
export const CHARITY_SCROLL_DISTANCE = CHARITY_HEADER_MAX_HEIGHT - CHARITY_HEADER_MIN_HEIGHT;

export default function CharityScreen() {
	const insets = useSafeAreaInsets();
	const scrollOffsetY = useRef(new Animated.Value(0)).current;
	
	return (
		<View className="flex-1 bg-background h-full">
			<ChairityHeader value={scrollOffsetY} />
			<Animated.ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? insets.bottom + 70 : 20 }}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
					{ useNativeDriver: false }
				)}
			>
				<ChairityGivePurpose/>
				<ChairityCalculateZakat />
				<ChairityCommunity />
			</Animated.ScrollView>
		</View>
	);
}
