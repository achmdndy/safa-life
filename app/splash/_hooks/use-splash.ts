import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated } from "react-native";

const ONBOARDING_STORAGE_KEY = "onboarding_completed";

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

		const scheduleRedirect = (path: string) => {
			const timer = setTimeout(() => {
				router.replace(path);
			}, 3000);
			return timer;
		};

		let timer: ReturnType<typeof setTimeout> | null = null;

		(async () => {
			try {
				const val = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
				const hasCompleted = val === "true";
				timer = scheduleRedirect(hasCompleted ? "/home" : "/onboarding");
			} catch {
				timer = scheduleRedirect("/onboarding");
			}
		})();

		return () => {
			if (timer) clearTimeout(timer);
		};
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
