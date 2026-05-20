import { useEffect, useMemo, useState } from "react";
import { useGetQuranTranslationsEditionsHook } from "@/api/coreService";
import type { DtoTranslationEditionResponse } from "@/api/coreService/types/dto/TranslationEditionResponse.ts";
import { useLanguage } from "@/contexts/language-context";

export type TranslationEditionOption = {
	id: string;
	name: string;
	language?: string;
	author?: string;
};

type UseTranslationListParams = {
	language?: string;
};

export function useTranslationList(params?: UseTranslationListParams) {
	const { currentLanguage } = useLanguage();
	const {
		data: dataEdition,
		isSuccess: isSuccessEdition,
		isLoading: isLoadingEdition,
		error: errorEdition,
	} = useGetQuranTranslationsEditionsHook({
		language: params?.language,
		limit: 0,
	});

	const list: TranslationEditionOption[] = useMemo(() => {
		const raw: DtoTranslationEditionResponse[] = (dataEdition?.data?.data ??
			[]) as DtoTranslationEditionResponse[];
		return (raw ?? [])
			.filter((e) => !!e?.id)
			.map((e) => ({
				id: e.id as string,
				name: (e.name ?? "") as string,
				language: e.language,
				author: e.author,
			}));
	}, [dataEdition]);

	const [selectedEditionId, setSelectedEditionId] = useState<string | null>(
		null,
	);

	useEffect(() => {
		if (!selectedEditionId && isSuccessEdition && list.length > 0) {
			const preferenceOrder: string[] =
				currentLanguage === "id" ? ["id", "en"] : [currentLanguage, "en"];

			let preferred = null as TranslationEditionOption | null;
			for (const lang of preferenceOrder) {
				preferred = list.find((e) => e.language === lang) ?? null;
				if (preferred) break;
			}

			setSelectedEditionId((preferred ?? list[0]).id);
		}
	}, [isSuccessEdition, list, selectedEditionId, currentLanguage]);

	const selectedEdition = useMemo(
		() => list.find((e) => e.id === selectedEditionId) ?? null,
		[list, selectedEditionId],
	);

	const selectEdition = (id: string) => setSelectedEditionId(id);

	return {
		editions: list,
		isLoading: isLoadingEdition,
		isSuccess: isSuccessEdition,
		error: errorEdition,
		selectedEditionId,
		selectedEdition,
		selectEdition,
		setSelectedEditionId, // exposed for controlled usage if needed
	};
}
