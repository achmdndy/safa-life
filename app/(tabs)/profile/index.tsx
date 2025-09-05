import { useRef } from "react";
import { Animated, Platform, View } from "react-native";
import { ProfileHeader } from "./_components/profile-header";
import { ProfileMenu } from "./_components/profile-menu";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const PROFILE_HEADER_MAX_HEIGHT = 270;
export const PROFILE_HEADER_MIN_HEIGHT = 130;
export const PROFILE_SCROLL_DISTANCE = 20;

export default function ProfileScreen() {
	const insets = useSafeAreaInsets();
	const scrollOffsetY = useRef(new Animated.Value(0)).current;

	return (
		<View className="flex-1 bg-background h-full">
			<ProfileHeader value={scrollOffsetY} />
			<Animated.ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? insets.bottom + 40 : 20 }}
				style={{
					zIndex: 0
				}}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
					{
						useNativeDriver: false,
					}
				)}
			>
				<ProfileMenu />
			</Animated.ScrollView>
		</View>
	);
}
