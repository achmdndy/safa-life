import { setAudioModeAsync, useAudioPlayer } from "expo-audio";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Alert,
	Animated,
	type FlatList,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	useGetQuranAyahsSurahSurahidHook,
	useGetQuranSurahsHook,
} from "@/api/coreService";
import type { DtoAyahWithTranslationResponse } from "@/api/coreService/types/dto/AyahWithTranslationResponse.ts";
import type { DtoSurahResponse } from "@/api/coreService/types/dto/SurahResponse.ts";
import { useQuranList } from "@/app/(tabs)/quran/_hooks/use-quran-list";
import { useAudioPreferences } from "@/app/quran/[surahId]/_hooks/use-audio-preferences";
import { useBottomSheet } from "@/components/bottom-sheet";
import apiConfig from "@/configs/api-config";
import { FOOTER_HEIGHT } from "../_components/surah-footer";
import { HEADER_HEIGHT } from "../_components/surah-header";
import { useAudioList } from "./use-audio-list";
import { useTranslationList } from "./use-translation-list";

const NAV_TRIGGER_THRESHOLD = 80;

export type Verse = {
	id: string;
	arabic: string;
	translation: string;
	isBookmarked: boolean;
	isRead: boolean;
	numberInSurah: number;
	audioUrl?: string;
	// render-only flag: when ayahs length !== surah.ayahCount, index 0 should display arabic-only centered (Bismillah)
	isBismillahOnly?: boolean;
	// render-only display number to start from 1 after Bismillah when mismatch
	displayNumber?: number;
};

export function useSurahAyahs() {
	const router = useRouter();
	const { surahId, autoplay } = useLocalSearchParams<{
		surahId: string;
		autoplay?: string;
	}>();
	const { top } = useSafeAreaInsets();
	const { ref: settingsSheetRef, open: openSettingsSheet } = useBottomSheet();

	const [canNavNext, setCanNavNext] = useState(false);
	const [canNavPrev, setCanNavPrev] = useState(false);
	const [isTopIndicatorVisible, setIsTopIndicatorVisible] = useState(false);
	const [isBottomIndicatorVisible, setIsBottomIndicatorVisible] =
		useState(false);

	// Next/Prev surah navigation derived from revelationOrder (online) or local list (offline)
	const [nextSurahIdStr, setNextSurahIdStr] = useState<string | null>(null);
	const [prevSurahIdStr, setPrevSurahIdStr] = useState<string | null>(null);
	const [nextSurahDisplayNumber, setNextSurahDisplayNumber] = useState<
		number | null
	>(null);
	const [prevSurahDisplayNumber, setPrevSurahDisplayNumber] = useState<
		number | null
	>(null);

	const totalHeaderHeight = HEADER_HEIGHT + top;
	const scrollY = useRef(new Animated.Value(0)).current;
	const lastOffsetY = useRef(0);
	const headerTranslateY = useRef(new Animated.Value(0)).current;
	const footerTranslateY = useRef(new Animated.Value(0)).current;
	const listFooterHeight = useRef(new Animated.Value(FOOTER_HEIGHT)).current;
	const androidJustHitBottom = useRef(false);
	const androidHitBottomTimer = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const listRef = useRef<FlatList<Verse> | null>(null);
	const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

	const { selectedReciterId, isLoading: isLoadingReciters } = useAudioList();
	const { selectedEditionId, isLoading: isLoadingEditions } =
		useTranslationList();

	const paramsReady = !!(selectedReciterId && selectedEditionId);

	const {
		data: dataAyahs,
		isSuccess: isSuccessAyahs,
		isLoading: isLoadingAyahsRaw,
		error: errorAyahs,
	} = useGetQuranAyahsSurahSurahidHook(
		surahId,
		{
			editionId: selectedEditionId ?? undefined,
			reciterId: selectedReciterId ?? undefined,
			limit: 0,
		},
		{
			query: {
				enabled: !!(surahId && paramsReady),
			},
		},
	);

	// Fetch full surah list (online) to map revelationOrder -> id, with offline fallback
	const { data: dataSurahList, isSuccess: isSuccessSurahList } =
		useGetQuranSurahsHook(
			{ limit: 0 },
			{ query: { enabled: true, staleTime: 1000 * 60 * 15 } },
		);
	const { surahs: localSurahs } = useQuranList();

	const [verses, setVerses] = useState<Verse[]>([]);
	const surah: DtoSurahResponse | undefined = dataAyahs?.data?.surah;

	// biome-ignore lint: correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const ayahs: DtoAyahWithTranslationResponse[] =
			dataAyahs?.data?.ayahs ?? [];
		if (isSuccessAyahs && Array.isArray(ayahs)) {
			const base = apiConfig.defaults.baseURL ?? "";
			const expectedCount =
				typeof surah?.ayahCount === "number" ? surah.ayahCount : 0;
			const mismatchCount = expectedCount > 0 && ayahs.length !== expectedCount;
			setVerses(
				ayahs.map((ayah, index) => {
					const rawPath = ayah?.audio?.filePath ?? "";
					const audioUrl = rawPath
						? /^https?:\/\//i.test(rawPath)
							? rawPath
							: `${base}${rawPath}`
						: undefined;
					return {
						id: ayah?.id ?? String(index + 1),
						arabic: ayah?.text ?? "",
						translation: ayah?.translation?.text ?? "",
						isBookmarked: false,
						isRead: false,
						numberInSurah: index + 1,
						audioUrl,
						isBismillahOnly: mismatchCount && index === 0,
						displayNumber: mismatchCount ? index : index + 1,
					} as Verse;
				}),
			);
			setCurrentVerseIndex(0);
		}
	}, [isSuccessAyahs, dataAyahs]);

	// biome-ignore lint: correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (autoplay === "1" && verses.length > 0 && !autoPlayedRef.current) {
			autoPlayedRef.current = true;
			loadAndPlayAtIndex(0);
		}
	}, [autoplay, verses.length]);

	const onBookmarkToggle = (verseId: string) => {
		setVerses((prevVerses) =>
			prevVerses.map((verse) =>
				verse.id === verseId
					? { ...verse, isBookmarked: !verse.isBookmarked }
					: verse,
			),
		);
		Alert.alert("Bookmark", `Verse ${verseId} bookmarked!`);
	};

	const onReadToggle = (verseId: string) => {
		setVerses((prevVerses) =>
			prevVerses.map((verse) =>
				verse.id === verseId ? { ...verse, isRead: !verse.isRead } : verse,
			),
		);
		Alert.alert("Read Marker", `Verse ${verseId} marked as read!`);
	};

	// Audio playback state (expo-audio)
	const player = useAudioPlayer();
	const [isPlaying, setIsPlaying] = useState(false);
	const currentAyahIdRef = useRef<string | null>(null);
	const repeatCounterRef = useRef(0);
	const { repeatEachVerse, atEndOfSurah } = useAudioPreferences();

	const configureAudioMode = async () => {
		if (Platform.OS === "web") return; // no-op on web
		await setAudioModeAsync({
			playsInSilentMode: true,
			shouldPlayInBackground: false,
			interruptionModeAndroid: "duckOthers",
			interruptionMode: "duckOthers",
		});
	};

	const unloadSound = async () => {
		try {
			// Lepas listener status dan hentikan pemutaran saat ini
			statusListenerRef.current?.remove?.();
			player.pause();
		} catch {}
		currentAyahIdRef.current = null;
	};

	// biome-ignore lint: correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		return () => {
			unloadSound();
		};
	}, []);

	// Guard to handle didJustFinish only once per sound instance
	const didFinishHandledRef = useRef(false);
	const autoPlayedRef = useRef(false);
	const statusListenerRef = useRef<{ remove: () => void } | null>(null);

	const loadAndPlayAtIndex = async (index: number) => {
		if (!verses[index]) return;
		const url = verses[index].audioUrl;
		if (!url) {
			Alert.alert("Audio", "Audio tidak tersedia untuk ayat ini.");
			return;
		}
		await configureAudioMode();
		// ensure previous sound is stopped before assigning a new callback
		await unloadSound();
		didFinishHandledRef.current = false;
		// replace source & attach status listener
		player.replace({ uri: url });
		const localIndex = index;
		const localAyahId = verses[localIndex].id;
		currentAyahIdRef.current = localAyahId;
		// reset repeat counter when starting a verse explicitly
		repeatCounterRef.current = 0;
		// remove old listener if any
		statusListenerRef.current?.remove?.();
		statusListenerRef.current = player.addListener(
			"playbackStatusUpdate",
			(status) => {
				// ignore events from stale sound instances
				if (currentAyahIdRef.current !== localAyahId) return;
				setIsPlaying(!!status.playing);
				if (status.didJustFinish && !didFinishHandledRef.current) {
					didFinishHandledRef.current = true;

					// Handle per-ayah repeat preferences
					if (repeatEachVerse === "indefinitely") {
						// replay the same verse indefinitely
						loadAndPlayAtIndex(localIndex);
						return;
					}
					const numericRepeat = parseInt(repeatEachVerse as string, 10);
					if (!Number.isNaN(numericRepeat) && numericRepeat > 0) {
						if (repeatCounterRef.current < numericRepeat) {
							repeatCounterRef.current += 1;
							loadAndPlayAtIndex(localIndex);
							return;
						} else {
							// finished repeats for this verse, reset counter and continue
							repeatCounterRef.current = 0;
						}
					}

					// compute next index based on the index that just finished (not state)
					const nextIndexFromLocal = localIndex + 1;
					if (nextIndexFromLocal >= verses.length) {
						// End of current surah
						setIsPlaying(false);
						unloadSound();
						if (atEndOfSurah === "repeat") {
							setCurrentVerseIndex(0);
							listRef.current?.scrollToIndex?.({ index: 0, animated: true });
							loadAndPlayAtIndex(0);
						} else if (atEndOfSurah === "next") {
							if (nextSurahIdStr) {
								router.replace(`/quran/${nextSurahIdStr}?autoplay=1`);
							} else {
								Alert.alert("Selesai", "Ini surah terakhir.", [{ text: "OK" }]);
							}
						} else {
							// stop
							Alert.alert("Selesai", "Pemutaran selesai.", [{ text: "OK" }]);
						}
						return;
					}
					// advance UI state and auto-play next
					setCurrentVerseIndex(nextIndexFromLocal);
					setVerses((prev) =>
						prev.map((v, i) =>
							i === nextIndexFromLocal ? { ...v, isRead: true } : v,
						),
					);
					listRef.current?.scrollToIndex?.({
						index: nextIndexFromLocal,
						animated: true,
					});
					// load next immediately
					loadAndPlayAtIndex(nextIndexFromLocal);
				}
			},
		);
		// start playing
		player.play();
	};

	const onPlayAudio = async () => {
		// toggle play/pause; if no source loaded, load current index
		if (isPlaying) {
			player.pause();
			setIsPlaying(false);
			return;
		}
		// if not playing, ensure current verse is loaded and play
		await loadAndPlayAtIndex(currentVerseIndex);
	};

	const onNextVerse = async (autoPlay = false) => {
		if (verses.length === 0) return;
		const nextIndex = Math.min(currentVerseIndex + 1, verses.length - 1);
		if (nextIndex !== currentVerseIndex) {
			setCurrentVerseIndex(nextIndex);
			setVerses((prev) =>
				prev.map((v, i) => (i === nextIndex ? { ...v, isRead: true } : v)),
			);
			listRef.current?.scrollToIndex?.({
				index: nextIndex,
				animated: true,
			});
			if (autoPlay || isPlaying) {
				await loadAndPlayAtIndex(nextIndex);
			}
		}
	};

	const onPrevVerse = async () => {
		if (verses.length === 0) return;
		const prevIndex = Math.max(currentVerseIndex - 1, 0);
		if (prevIndex !== currentVerseIndex) {
			setCurrentVerseIndex(prevIndex);
			listRef.current?.scrollToIndex?.({
				index: prevIndex,
				animated: true,
			});
			if (isPlaying) {
				await loadAndPlayAtIndex(prevIndex);
			}
		}
	};

	const onPressSettings = () => {
		openSettingsSheet();
	};

	const handleNavigateToNextSurah = () => {
		if (nextSurahIdStr) {
			router.replace(`/quran/${nextSurahIdStr}`);
		}
	};

	const handleNavigateToPrevSurah = () => {
		if (prevSurahIdStr) {
			router.replace(`/quran/${prevSurahIdStr}`);
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

				const topOverscroll = -offsetY;
				setIsTopIndicatorVisible(topOverscroll > 1);
				if (topOverscroll > NAV_TRIGGER_THRESHOLD) {
					if (!canNavPrev) setCanNavPrev(true);
				} else {
					if (canNavPrev) setCanNavPrev(false);
				}

				const bottomOverscroll =
					offsetY - (contentSize.height - layoutMeasurement.height);
				setIsBottomIndicatorVisible(bottomOverscroll > 1);

				if (Platform.OS === "android") {
					const isAtBottom =
						offsetY >= contentSize.height - layoutMeasurement.height - 1;

					if (isAtBottom && !androidJustHitBottom.current) {
						androidJustHitBottom.current = true;
						if (androidHitBottomTimer.current) {
							clearTimeout(androidHitBottomTimer.current);
						}
						androidHitBottomTimer.current = setTimeout(() => {
							androidJustHitBottom.current = false;
						}, 200);
					} else if (!isAtBottom) {
						androidJustHitBottom.current = false;
						if (androidHitBottomTimer.current) {
							clearTimeout(androidHitBottomTimer.current);
						}
					}
				} else {
					if (bottomOverscroll > NAV_TRIGGER_THRESHOLD) {
						if (!canNavNext) setCanNavNext(true);
					} else {
						if (canNavNext) setCanNavNext(false);
					}
				}

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

	const handleScrollEnd = (
		event: NativeSyntheticEvent<
			NativeScrollEvent & { velocity?: { y: number } }
		>,
	) => {
		if (canNavPrev) {
			handleNavigateToPrevSurah();
		}
		if (canNavNext) {
			handleNavigateToNextSurah();
			return;
		}

		if (Platform.OS === "android") {
			const { contentOffset, contentSize, layoutMeasurement, velocity } =
				event.nativeEvent;
			const isAtBottom =
				contentOffset.y >= contentSize.height - layoutMeasurement.height - 5;

			if (velocity) {
				const isFling = velocity.y > 0.5;
				const isSlowPull =
					Math.abs(velocity.y) < 0.5 && androidJustHitBottom.current;

				if (isAtBottom && (isFling || isSlowPull)) {
					handleNavigateToNextSurah();
				}
			}
		}

		if (androidHitBottomTimer.current) {
			clearTimeout(androidHitBottomTimer.current);
		}
		androidJustHitBottom.current = false;
	};

	// Compute next/prev surah by revelationOrder (online) or by local surahNumber (offline)
	useEffect(() => {
		const currentId = surah?.id ?? (typeof surahId === "string" ? surahId : "");
		if (!currentId) {
			setNextSurahIdStr(null);
			setPrevSurahIdStr(null);
			setNextSurahDisplayNumber(null);
			setPrevSurahDisplayNumber(null);
			return;
		}

		const apiSurahs = dataSurahList?.data?.data ?? [];
		if (isSuccessSurahList && apiSurahs.length > 0) {
			// Order by revelationOrder for chronological navigation
			const ordered = [...apiSurahs].sort(
				(a, b) => (a.revelationOrder ?? 0) - (b.revelationOrder ?? 0),
			);
			const idx = ordered.findIndex((s) => s.id === currentId);
			const prev = idx > 0 ? ordered[idx - 1] : undefined;
			const next =
				idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : undefined;
			setPrevSurahIdStr(prev?.id ?? null);
			setNextSurahIdStr(next?.id ?? null);
			setPrevSurahDisplayNumber(prev?.revelationOrder ?? null);
			setNextSurahDisplayNumber(next?.revelationOrder ?? null);
			return;
		}

		// Offline fallback: use local surahs ordered by surahNumber (mushaf order)
		if (localSurahs && localSurahs.length > 0) {
			const sorted = [...localSurahs].sort(
				(a, b) => a.surahNumber - b.surahNumber,
			);
			const idxLocal = sorted.findIndex((s) => s.id === currentId);
			const prevLocal = idxLocal > 0 ? sorted[idxLocal - 1] : undefined;
			const nextLocal =
				idxLocal >= 0 && idxLocal < sorted.length - 1
					? sorted[idxLocal + 1]
					: undefined;
			setPrevSurahIdStr(prevLocal?.id ?? null);
			setNextSurahIdStr(nextLocal?.id ?? null);
			setPrevSurahDisplayNumber(prevLocal?.surahNumber ?? null);
			setNextSurahDisplayNumber(nextLocal?.surahNumber ?? null);
			return;
		}

		// If nothing available
		setNextSurahIdStr(null);
		setPrevSurahIdStr(null);
		setNextSurahDisplayNumber(null);
		setPrevSurahDisplayNumber(null);
	}, [surah?.id, surahId, isSuccessSurahList, dataSurahList, localSurahs]);

	return {
		surahId,
		surah,
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
		prevSurahDisplayNumber,
		nextSurahDisplayNumber,
		onBookmarkToggle,
		onReadToggle,
		onPlayAudio,
		onNextVerse,
		onPrevVerse,
		onNextSurah: handleNavigateToNextSurah,
		onPrevSurah: handleNavigateToPrevSurah,
		onPressSettings,
		settingsSheetRef,
		isLoadingAyahs:
			!paramsReady ||
			isLoadingReciters ||
			isLoadingEditions ||
			isLoadingAyahsRaw,
		errorAyahs,
		listRef,
		currentVerseIndex,
		isPlaying,
	};
}
