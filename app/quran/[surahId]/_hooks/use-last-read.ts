import type { AxiosError } from "axios";
import { useCallback, useRef, useState } from "react";
import type { ViewToken } from "react-native";
import { Alert } from "react-native";
import { postQuranLastReadsHook } from "@/api/coreService/hooks/lastReadController/usePostQuranLastReadsHook";

function getAxiosErrorMessage(error: unknown, fallback: string): string {
	const axiosErr = error as AxiosError<unknown>;
	const message = (axiosErr?.response?.data as { message?: string } | undefined)
		?.message;
	if (typeof message === "string" && message.length > 0) return message;
	if (
		error instanceof Error &&
		typeof error.message === "string" &&
		error.message.length > 0
	)
		return error.message;
	return fallback;
}

type QuranAyahListItem = {
	id: string;
	displayNumber?: number;
	numberInSurah?: number;
	isBismillahOnly?: boolean;
};

function isQuranAyahListItem(item: unknown): item is QuranAyahListItem {
	if (!item || typeof item !== "object") return false;
	const id = (item as { id?: unknown }).id;
	return typeof id === "string";
}

function isBismillahOnly(item: unknown): boolean {
	if (!item || typeof item !== "object") return false;
	const flag = (item as { isBismillahOnly?: unknown }).isBismillahOnly;
	return Boolean(flag);
}

export type MarkLastReadParams = {
	surahId?: string;
	ayahId: string;
	ayahNumber: number;
	progressPct?: number; // default 100 when visible
};

export function useLastRead(initialSurahId?: string) {
	const surahIdRef = useRef<string | undefined>(initialSurahId);
	const [isLoading, setIsLoading] = useState(false);
	const lastSavedAyahIdRef = useRef<string | null>(null);
	const lastErrorAlertAtRef = useRef<number>(0);
	const firstEligibleAtRef = useRef<number>(Date.now() + 60_000); // 1 menit jeda awal

	const markLastRead = useCallback(
		async (params: MarkLastReadParams) => {
			const surahId = params.surahId ?? surahIdRef.current;
			if (!surahId || !params.ayahId || !params.ayahNumber) return;

			// Jeda awal 1 menit agar tidak auto mark saat pertama kali masuk
			if (Date.now() < firstEligibleAtRef.current) return;

			// Avoid spamming server for the same ayah while scrolling slowly
			if (lastSavedAyahIdRef.current === params.ayahId && isLoading) return;
			lastSavedAyahIdRef.current = params.ayahId;
			setIsLoading(true);
			try {
				await postQuranLastReadsHook({
					surahId,
					ayahId: params.ayahId,
					ayahNumber: params.ayahNumber,
					progressPct: params.progressPct ?? 100,
				});
			} catch (e) {
				// Tampilkan pesan error, throttled agar tidak spam saat scroll
				const now = Date.now();
				if (now - lastErrorAlertAtRef.current > 5000) {
					const message = getAxiosErrorMessage(
						e,
						"Terjadi kesalahan saat menyimpan terakhir dibaca.",
					);
					Alert.alert(
						"Gagal",
						typeof message === "string"
							? message
							: "Gagal menyimpan terakhir dibaca",
					);
					lastErrorAlertAtRef.current = now;
				}
				console.error("postQuranLastReadsHook error", e);
			} finally {
				setIsLoading(false);
			}
		},
		[isLoading],
	);

	const viewabilityConfig = { itemVisiblePercentThreshold: 60 } as const;
	const onViewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			// Pick the first fully viewable non-Bismillah item
			const first = viewableItems.find(
				(v) => v.isViewable && v.item && !isBismillahOnly(v.item),
			);
			if (first?.item && isQuranAyahListItem(first.item)) {
				const item = first.item;
				const numberCandidate = item.displayNumber ?? item.numberInSurah;
				if (typeof numberCandidate !== "number") return;
				const ayahNumber = numberCandidate;
				const ayahId = item.id;
				markLastRead({
					surahId: surahIdRef.current,
					ayahId,
					ayahNumber,
					progressPct: 100,
				});
			}
		},
	);

	const setSurahId = (s: string) => {
		surahIdRef.current = s;
		firstEligibleAtRef.current = Date.now() + 60_000; // reset jeda saat ganti surah
	};

	return {
		markLastRead,
		isLoading,
		viewabilityConfig,
		onViewableItemsChanged: onViewableItemsChanged.current,
		setSurahId,
	};
}
