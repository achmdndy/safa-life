import type { AxiosError } from "axios";
import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { postQuranBookmarksAyahsHook } from "@/api/coreService/hooks/bookmarksController/usePostQuranBookmarksAyahsHook";

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

export type ToggleBookmarkParams = {
	ayahId: string;
	// Optional callback to update UI state locally
	onLocalToggle?: (ayahId: string) => void;
};

export function useBookmark() {
	const [isLoading, setIsLoading] = useState(false);
	const lastReqAyahIdRef = useRef<string | null>(null);

	const toggleBookmark = useCallback(
		async ({ ayahId, onLocalToggle }: ToggleBookmarkParams) => {
			if (!ayahId) return;
			// Prevent duplicate rapid taps
			if (lastReqAyahIdRef.current === ayahId && isLoading) return;
			setIsLoading(true);
			lastReqAyahIdRef.current = ayahId;
			try {
				await postQuranBookmarksAyahsHook({
					ayahId,
				});
				// Update lokal hanya saat request sukses
				onLocalToggle?.(ayahId);
			} catch (e) {
				console.log({ e });

				// Tampilkan pesan error agar tidak terkesan berhasil saat gagal
				const message = getAxiosErrorMessage(
					e,
					"Terjadi kesalahan saat menyimpan bookmark.",
				);
				Alert.alert(
					"Gagal",
					typeof message === "string" ? message : "Gagal menyimpan bookmark",
				);
				console.error("postQuranBookmarksAyahsHook error", e);
			} finally {
				setIsLoading(false);
			}
		},
		[isLoading],
	);

	return { toggleBookmark, isLoading };
}
