import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Animated, Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppImages } from "@/assets/images";
import { themes, useTheme } from "@/contexts/theme-context";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, SCROLL_DISTANCE } from "..";
import { LoginGuestButton } from "./login-guest-button";

export default function LoginHeader({ value }: { value: Animated.Value }) {
	const { t } = useTranslation("login");
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	const insets = useSafeAreaInsets();
	const animatedHeaderHeight = value.interpolate({
		inputRange: [0, SCROLL_DISTANCE],
		outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			style={[
				{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 1,
					height: animatedHeaderHeight,
					justifyContent: "center",
					alignItems: "center",
				},
			]}
		>
			<LinearGradient
				colors={[selectedTheme.primary, selectedTheme.secondary]}
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				}}
			/>
			<View
				className="absolute top-0 right-6 z-10"
				style={{ marginTop: insets.top }}
			>
				<LoginGuestButton />
			</View>
			<View className="items-center justify-center px-6">
				<Image
					source={AppImages.login}
					style={{
						width: "80%",
						height: undefined,
						aspectRatio: 1 / 1,
					}}
					accessible
					accessibilityRole="image"
					accessibilityLabel={t("accessibility.welcomeImage")}
				/>
			</View>
			<View className="rounded-t-full h-8 w-full bg-background absolute bottom-0" />
		</Animated.View>
	);
}
