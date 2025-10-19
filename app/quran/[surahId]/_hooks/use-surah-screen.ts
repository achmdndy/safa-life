import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
	Alert,
	Animated,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheet } from "@/components/bottom-sheet";

import { FOOTER_HEIGHT } from "../_components/surah-footer";
import { HEADER_HEIGHT } from "../_components/surah-header";

const NAV_TRIGGER_THRESHOLD = 80;

export function useSurahScreen() {
	const router = useRouter();
	const { surahId } = useLocalSearchParams<{ surahId: string }>();
	const { top } = useSafeAreaInsets();
	const { ref: settingsSheetRef, open: openSettingsSheet } = useBottomSheet();

	const [canNavNext, setCanNavNext] = useState(false);
	const [canNavPrev, setCanNavPrev] = useState(false);
	const [isTopIndicatorVisible, setIsTopIndicatorVisible] = useState(false);
	const [isBottomIndicatorVisible, setIsBottomIndicatorVisible] =
		useState(false);

	const currentSurahId = parseInt(surahId || "1", 10);
	const nextSurahId = currentSurahId + 1;
	const prevSurahId = currentSurahId - 1;

	const totalHeaderHeight = HEADER_HEIGHT + top;
	const scrollY = useRef(new Animated.Value(0)).current;
	const lastOffsetY = useRef(0);
	const headerTranslateY = useRef(new Animated.Value(0)).current;
	const footerTranslateY = useRef(new Animated.Value(0)).current;
	const listFooterHeight = useRef(new Animated.Value(FOOTER_HEIGHT)).current;

	const [verses, setVerses] = useState(
		Array.from({ length: 150 }, (_, i) => ({
			id: i + 1,
			arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (${i + 1})`,
			translation: `In the name of Allah, the Entirely Merciful, the Especially Merciful. (${i + 1})`,
			isBookmarked: false,
			isRead: false,
		})),
	);

	const onBookmarkToggle = (verseId: number) => {
		setVerses((prevVerses) =>
			prevVerses.map((verse) =>
				verse.id === verseId
					? { ...verse, isBookmarked: !verse.isBookmarked }
					: verse,
			),
		);
		Alert.alert("Bookmark", `Verse ${verseId} bookmarked!`);
	};

	const onReadToggle = (verseId: number) => {
		setVerses((prevVerses) =>
			prevVerses.map((verse) =>
				verse.id === verseId ? { ...verse, isRead: !verse.isRead } : verse,
			),
		);
		Alert.alert("Read Marker", `Verse ${verseId} marked as read!`);
	};

	const onPlayAudio = () => {
		Alert.alert("Audio", "Playing audio for current verse!");
	};

	const onNextVerse = () => {
		Alert.alert("Next Verse", "Navigating to next verse!");
		// Implement actual scroll to next verse logic here if needed
	};

	const onPrevVerse = () => {
		Alert.alert("Previous Verse", "Navigating to previous verse!");
		// Implement actual scroll to previous verse logic here if needed
	};

	const onPressInfo = () => {
		Alert.alert("Information", `Information about Surah ${surahId}`);
	};

	const onPressSettings = () => {
		openSettingsSheet();
	};

	const handleNavigateToNextSurah = () => {
		if (nextSurahId <= 114) {
			router.replace(`/quran/${nextSurahId}`);
		}
	};

	const handleNavigateToPrevSurah = () => {
		if (prevSurahId > 0) {
			router.replace(`/quran/${prevSurahId}`);
		}
	};

	const showBars = () => {
		Animated.parallel([
			Animated.timing(headerTranslateY, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(footerTranslateY, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(listFooterHeight, {
				toValue: FOOTER_HEIGHT,
				duration: 300,
				useNativeDriver: false,
			}),
		]).start();
	};

	const hideBars = () => {
		Animated.parallel([
			Animated.timing(headerTranslateY, {
				toValue: -totalHeaderHeight,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(footerTranslateY, {
				toValue: FOOTER_HEIGHT,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(listFooterHeight, {
				toValue: 0,
				duration: 300,
				useNativeDriver: false,
			}),
		]).start();
	};

	const handleScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { y: scrollY } } }],
		{
			useNativeDriver: false,
			listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
				const { contentOffset, contentSize, layoutMeasurement } =
					event.nativeEvent;
				const offsetY = contentOffset.y;

				// --- Top/Prev Navigation Logic ---
				const topOverscroll = -offsetY;
				setIsTopIndicatorVisible(topOverscroll > 1);
				if (topOverscroll > NAV_TRIGGER_THRESHOLD) {
					if (!canNavPrev) setCanNavPrev(true);
				} else {
					if (canNavPrev) setCanNavPrev(false);
				}

				// --- Bottom/Next Navigation Logic ---
				const bottomOverscroll =
					offsetY - (contentSize.height - layoutMeasurement.height);
				setIsBottomIndicatorVisible(bottomOverscroll > 1);
				if (bottomOverscroll > NAV_TRIGGER_THRESHOLD) {
					if (!canNavNext) setCanNavNext(true);
				} else {
					if (canNavNext) setCanNavNext(false);
				}

				// --- Header/Footer Animation Logic ---
				const diff = offsetY - lastOffsetY.current;
				if (offsetY < 0) {
					showBars();
					return;
				}
				if (offsetY < totalHeaderHeight) {
					showBars();
				} else if (diff > 5) {
					hideBars();
				} else if (diff < -5) {
					showBars();
				}
				lastOffsetY.current = offsetY;
			},
		},
	);

	const handleScrollEnd = () => {
		if (canNavPrev) {
			handleNavigateToPrevSurah();
		}
		if (canNavNext) {
			handleNavigateToNextSurah();
		}
	};

	return {
		surahId,
		top,
		totalHeaderHeight,
		verses,
		headerTranslateY,
		footerTranslateY,
		listFooterHeight,
		handleScroll,
		handleScrollEnd,
		canNavPrev,
		canNavNext,
		isTopIndicatorVisible,
		isBottomIndicatorVisible,
		prevSurahId,
		nextSurahId,
		onBookmarkToggle,
		onReadToggle,
		onPlayAudio,
		onNextVerse,
		onPrevVerse,
		onPressInfo,
		onPressSettings,
		settingsSheetRef,
	};
}
