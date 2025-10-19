import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AccessibilityInfo, Animated, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileHeader } from "./_components/profile-header";
import { ProfileMenu } from "./_components/profile-menu";

export const PROFILE_HEADER_MAX_HEIGHT = 270;
export const PROFILE_HEADER_MIN_HEIGHT = 130;
export const PROFILE_SCROLL_DISTANCE =
	PROFILE_HEADER_MAX_HEIGHT - PROFILE_HEADER_MIN_HEIGHT;

export default function ProfileScreen() {
	const { t } = useTranslation("profile");
	const insets = useSafeAreaInsets();
	const scrollOffsetY = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		AccessibilityInfo.announceForAccessibility(
			t("accessibility.welcomeAnnouncement"),
		);
	}, [t]);

	return (
		<View className="flex-1 bg-background h-full">
			<ProfileHeader value={scrollOffsetY} />
			<Animated.ScrollView
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
				bounces={false}
				overScrollMode="never"
				contentContainerStyle={{
					paddingBottom: Platform.OS === "ios" ? insets.bottom + 40 : 40,
					flexGrow: 1,
				}}
				style={{
					zIndex: 0,
				}}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
					{
						useNativeDriver: false,
					},
				)}
			>
				<ProfileMenu />
			</Animated.ScrollView>
		</View>
	);
}
