import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, useWindowDimensions } from "react-native";
import {
	Easing,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/utils";

const ONBOARDING_STORAGE_KEY = "onboarding_completed";
const ANIMATION_DURATION = 1600;
const SKIP_ANIMATION_DURATION = 1200;

export function useOnboarding() {
	const router = useRouter();
	const window = useWindowDimensions();

	const [currentPage, setCurrentPage] = useState(0);

	const animationProgress = useSharedValue(0);

	const windowHeight = window.height;

	useDerivedValue(() => {
		runOnJS(setCurrentPage)(animationProgress.value);
	}, [animationProgress]);

	// Animated styles using reanimated
	const relaxTranslateYStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			animationProgress.value,
			[0, 0.2, 0.4, 0.6, 0.8],
			[windowHeight, 0, 0, 0, 0],
		);
		return {
			transform: [{ translateY }],
		};
	});

	const playAnimation = useCallback(
		(toValue: number, duration: number = ANIMATION_DURATION) => {
			animationProgress.value = withTiming(toValue, {
				duration,
				easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
			});
		},
		[animationProgress],
	);

	const onNextClick = useCallback(async () => {
		let toValue: number;
		const currentValue = animationProgress.value;
		if (currentValue === 0) {
			toValue = 0.2;
		} else if (currentValue >= 0 && currentValue <= 0.2) {
			toValue = 0.4;
		} else if (currentValue > 0.2 && currentValue <= 0.4) {
			toValue = 0.6;
		} else if (currentValue > 0.4 && currentValue <= 0.6) {
			toValue = 0.8;
		} else if (currentValue > 0.6 && currentValue <= 0.8) {
			try {
				await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
				const { error } = await authClient.signIn.anonymous();
				if (error) {
					Alert.alert(
						"Login gagal",
						error.message ?? "Tidak dapat login secara anonim.",
					);
					return;
				}
			} catch (e: unknown) {
				Alert.alert(
					"Login gagal",
					getErrorMessage(e) ?? "Tidak dapat login secara anonim.",
				);
				return;
			}
			router.replace("/home");
			return;
		}

		if (toValue !== undefined) {
			playAnimation(toValue);
		}
	}, [playAnimation, router, animationProgress]);

	const onBackClick = useCallback(() => {
		let toValue: number;
		const currentValue = animationProgress.value;
		if (currentValue >= 0.2 && currentValue < 0.4) {
			toValue = 0.0;
		} else if (currentValue >= 0.4 && currentValue < 0.6) {
			toValue = 0.2;
		} else if (currentValue >= 0.6 && currentValue < 0.8) {
			toValue = 0.4;
		} else if (currentValue === 0.8) {
			toValue = 0.6;
		}

		if (toValue !== undefined) {
			playAnimation(toValue);
		}
	}, [playAnimation, animationProgress]);

	const onSkipClick = useCallback(() => {
		playAnimation(0.8, SKIP_ANIMATION_DURATION);
	}, [playAnimation]);

	return {
		currentPage,
		animationProgress,
		relaxTranslateYStyle,
		onNextClick,
		onBackClick,
		onSkipClick,
	};
}
