import { useActionSheet } from "@expo/react-native-action-sheet";
import { useCallback, useMemo } from "react";
import { create } from "zustand";

export type RepeatVerseOption = "never" | "1" | "2" | "3" | "indefinitely";
export type EndOfSurahOption = "stop" | "repeat" | "next";

export const repeatVerseOptions: { label: string; value: RepeatVerseOption }[] =
	[
		{ label: "Never", value: "never" },
		{ label: "1 time", value: "1" },
		{ label: "2 times", value: "2" },
		{ label: "3 times", value: "3" },
		{ label: "Indefinitely", value: "indefinitely" },
	];

export const endOfSurahOptions: { label: string; value: EndOfSurahOption }[] = [
	{ label: "Stop playing", value: "stop" },
	{ label: "Repeat the surah", value: "repeat" },
	{ label: "Play the next surah", value: "next" },
];

type AudioPreferencesState = {
	repeatEachVerse: RepeatVerseOption;
	atEndOfSurah: EndOfSurahOption;
	setRepeatEachVerse: (v: RepeatVerseOption) => void;
	setAtEndOfSurah: (v: EndOfSurahOption) => void;
};

export const useAudioPreferencesStore = create<AudioPreferencesState>()(
	(set) => ({
		repeatEachVerse: "never",
		atEndOfSurah: "stop",
		setRepeatEachVerse: (v) => set({ repeatEachVerse: v }),
		setAtEndOfSurah: (v) => set({ atEndOfSurah: v }),
	}),
);

export function useAudioPreferences() {
	const { showActionSheetWithOptions } = useActionSheet();
	const { repeatEachVerse, atEndOfSurah, setRepeatEachVerse, setAtEndOfSurah } =
		useAudioPreferencesStore();

	const repeatEachVerseLabel = useMemo(
		() =>
			repeatVerseOptions.find((o) => o.value === repeatEachVerse)?.label ??
			"Never",
		[repeatEachVerse],
	);
	const atEndOfSurahLabel = useMemo(
		() =>
			endOfSurahOptions.find((o) => o.value === atEndOfSurah)?.label ??
			"Stop playing",
		[atEndOfSurah],
	);

	const handleRepeatEachVerse = useCallback(() => {
		const options = [...repeatVerseOptions.map((o) => o.label), "Cancel"];
		const cancelButtonIndex = options.length - 1;
		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
				title: "Repeat Each Verse",
			},
			(buttonIndex) => {
				if (buttonIndex !== cancelButtonIndex) {
					setRepeatEachVerse(repeatVerseOptions[buttonIndex].value);
				}
			},
		);
	}, [showActionSheetWithOptions, setRepeatEachVerse]);

	const handleAtEndOfSurah = useCallback(() => {
		const options = [...endOfSurahOptions.map((o) => o.label), "Cancel"];
		const cancelButtonIndex = options.length - 1;
		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
				title: "At the End of a Surah",
			},
			(buttonIndex) => {
				if (buttonIndex !== cancelButtonIndex) {
					setAtEndOfSurah(endOfSurahOptions[buttonIndex].value);
				}
			},
		);
	}, [showActionSheetWithOptions, setAtEndOfSurah]);

	return {
		repeatEachVerse,
		atEndOfSurah,
		setRepeatEachVerse,
		setAtEndOfSurah,
		repeatEachVerseLabel,
		atEndOfSurahLabel,
		handleRepeatEachVerse,
		handleAtEndOfSurah,
	};
}
