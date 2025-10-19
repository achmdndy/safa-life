import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated } from "react-native";

export function useSplash() {
	const router = useRouter();
	const { i18n } = useTranslation("splash");

	const logoFadeAnim = useRef(new Animated.Value(0)).current;
	const logoScaleAnim = useRef(new Animated.Value(0.8)).current;
	const textSlideAnim = useRef(new Animated.Value(30)).current;
	const textFadeAnim = useRef(new Animated.Value(0)).current;
	const loadingFadeAnim = useRef(new Animated.Value(0)).current;

	const isRTL = i18n.dir() === "rtl";

	// biome-ignore lint: correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		Animated.sequence([
			Animated.parallel([
				Animated.timing(logoFadeAnim, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true,
				}),
				Animated.spring(logoScaleAnim, {
					toValue: 1,
					friction: 4,
					useNativeDriver: true,
				}),
			]),
			Animated.parallel([
				Animated.timing(textFadeAnim, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true,
				}),
				Animated.spring(textSlideAnim, {
					toValue: 0,
					friction: 5,
					useNativeDriver: true,
				}),
			]),
			Animated.timing(loadingFadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
				delay: 200,
			}),
		]).start();

		const timer = setTimeout(() => {
			router.replace("/onboarding");
		}, 3000);

		return () => clearTimeout(timer);
	}, [router]);

	return {
		isRTL,
		logoFadeAnim,
		logoScaleAnim,
		textFadeAnim,
		textSlideAnim,
		loadingFadeAnim,
	};
}
