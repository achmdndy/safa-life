import { useEffect, useMemo, useState } from "react";
import { useGetQuranRecitersHook } from "@/api/coreService";
import type { DtoReciterResponse } from "@/api/coreService/types/dto/ReciterResponse.ts";

export type ReciterOption = {
	id: string;
	name: string;
	style?: string;
};

export function useAudioList() {
	const {
		data: dataAudio,
		isSuccess: isSuccessAudio,
		isLoading: isLoadingAudio,
		error: errorAudio,
	} = useGetQuranRecitersHook({ limit: 0 });

	const list: ReciterOption[] = useMemo(() => {
		const raw: DtoReciterResponse[] = (dataAudio?.data?.data ??
			[]) as DtoReciterResponse[];
		return (raw ?? [])
			.filter((r) => !!r?.id)
			.map((r) => ({
				id: r.id as string,
				name: (r.name ?? "") as string,
				style: r.style,
			}));
	}, [dataAudio]);

	const [selectedReciterId, setSelectedReciterId] = useState<string | null>(
		null,
	);

	useEffect(() => {
		if (!selectedReciterId && isSuccessAudio && list.length > 0) {
			setSelectedReciterId(list[0].id);
		}
	}, [isSuccessAudio, list, selectedReciterId]);

	const selectedReciter = useMemo(
		() => list.find((r) => r.id === selectedReciterId) ?? null,
		[list, selectedReciterId],
	);

	const selectReciter = (id: string) => setSelectedReciterId(id);

	return {
		reciters: list,
		isLoading: isLoadingAudio,
		isSuccess: isSuccessAudio,
		error: errorAudio,
		selectedReciterId,
		selectedReciter,
		selectReciter,
		setSelectedReciterId, // exposed for controlled usage if needed
	};
}
