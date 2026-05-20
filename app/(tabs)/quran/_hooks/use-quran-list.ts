import { useRealm } from "@realm/react";
import { useEffect, useState } from "react";
import Realm from "realm";
import { useGetQuranSurahsHook } from "@/api/coreService";
import type { DtoSurahResponse } from "@/api/coreService/types/dto/SurahResponse.ts";
import { scheduleRealmJob } from "@/lib/realm/job-queue";
import type { QuranSurah } from "@/schemas/realms/quran";

type SurahListItem = {
	id: string; // surah number
	surahNumber: number; // surah number
	name: string; // arabic name
	nameTranslit: string; // english name
	meaning: string; // revelation place
	totalVerses: number;
};

export function useQuranList() {
	const realm = useRealm();
	const [surahs, setSurahs] = useState<SurahListItem[]>([]);

	const {
		data: apiData,
		isSuccess,
		isLoading,
		error,
	} = useGetQuranSurahsHook(
		{ limit: 0 },
		{
			query: {
				refetchOnReconnect: true,
				refetchOnMount: true,
				retry: 1,
			},
		},
	);

	useEffect(() => {
		try {
			const stored = realm.objects<QuranSurah>("QuranSurah").sorted("number");
			if (stored.length > 0 && surahs.length === 0) {
				const mapped: SurahListItem[] = stored.map((s) => ({
					id: s.id,
					surahNumber: s.number,
					name: s.nameArabic ?? "",
					nameTranslit: s.nameEnglish ?? "",
					meaning: s.revelationPlace ?? "",
					totalVerses: s.ayahCount ?? 0,
				}));
				setSurahs(mapped);
			}
		} catch {}

		if (isSuccess && apiData?.data?.data?.length) {
			const list: DtoSurahResponse[] = apiData.data.data ?? [];

			const mappedFromApi: SurahListItem[] = list.map((item, idx) => ({
				id: item.id ?? "",
				surahNumber: idx + 1,
				name: item.nameArabic ?? "",
				nameTranslit: item.nameEnglish ?? "",
				meaning: item.revelationPlace ?? "",
				totalVerses: item.ayahCount ?? 0,
			}));
			setSurahs(mappedFromApi);

			scheduleRealmJob(
				"Sync surah list from API",
				() =>
					new Promise<void>((resolve) => {
						realm.write(() => {
							list.forEach((item: DtoSurahResponse, idx: number) => {
								realm.create(
									"QuranSurah",
									{
										number: idx + 1,
										id: item.id ?? "",
										nameArabic: item.nameArabic ?? "",
										nameEnglish: item.nameEnglish ?? "",
										revelationPlace: item.revelationPlace ?? "",
										ayahCount: item.ayahCount ?? 0,
										updatedAt: item.updatedAt ?? undefined,
										createdAt: item.createdAt ?? undefined,
									},
									Realm.UpdateMode.Modified,
								);
							});
						});
						resolve();
					}),
			);
		} else if (error) {
			try {
				const stored = realm.objects<QuranSurah>("QuranSurah").sorted("number");
				if (stored.length > 0) {
					const mapped: SurahListItem[] = stored.map((s) => ({
						id: s.id,
						surahNumber: s.number,
						name: s.nameArabic ?? "",
						nameTranslit: s.nameEnglish ?? "",
						meaning: s.revelationPlace ?? "",
						totalVerses: s.ayahCount ?? 0,
					}));
					setSurahs(mapped);
				}
			} catch {}
		}
	}, [realm, surahs.length, isSuccess, apiData, error]);

	return { surahs, isLoading, error };
}
