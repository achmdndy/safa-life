import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated } from "react-native";
import { useTheme } from "@/contexts/theme-context";

export function useSplash() {
	const router = useRouter();
	const { t, i18n } = useTranslation("splash");
	const { theme } = useTheme();
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideAnim = useRef(new Animated.Value(50)).current;

	const isRTL = i18n.dir() === "rtl";

	// biome-ignore lint: correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 800,
				useNativeDriver: true,
			}),
		]).start();

		const timer = setTimeout(() => {
			router.replace("/search/home");
		}, 100);

		return () => clearTimeout(timer);
	}, [router]);

	return { isRTL, t, theme, fadeAnim, slideAnim };
}
