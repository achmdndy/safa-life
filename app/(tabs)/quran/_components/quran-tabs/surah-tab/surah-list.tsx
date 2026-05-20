import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Dimensions, Platform, Pressable, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";
import { useBookmarkList } from "../../../_hooks/use-bookmark-list";
import { useLastRead } from "../../../_hooks/use-last-read";
import { useQuranList } from "../../../_hooks/use-quran-list";

const SKELETON_KEYS = [
	"surah-skeleton-1",
	"surah-skeleton-2",
	"surah-skeleton-3",
	"surah-skeleton-4",
	"surah-skeleton-5",
	"surah-skeleton-6",
	"surah-skeleton-7",
	"surah-skeleton-8",
	"surah-skeleton-9",
	"surah-skeleton-10",
];

export default function SurahList() {
	const { surahs, isLoading } = useQuranList();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const { dataBookmark } = useBookmarkList();
	const { dataLastRead, isLoadingLastRead } = useLastRead();
	const { height } = Dimensions.get("window");
	const { currentTheme, theme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const isDarkMode = theme === "dark";
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);
	const { t } = useTranslation("quran");

	const lastReadItem = (dataLastRead?.data?.data ?? []).slice().sort((a, b) => {
		const ta = new Date(a.lastReadAt ?? 0).getTime();
		const tb = new Date(b.lastReadAt ?? 0).getTime();
		return tb - ta;
	})[0];

	const lastSurah = surahs?.find((s) => s.id === lastReadItem?.surahId);
	const lastAyahNumber = lastReadItem?.ayahNumber ?? 0;
	const totalVerses = lastSurah?.totalVerses ?? 0;
	const progressPct =
		totalVerses > 0 ? Math.round((lastAyahNumber / totalVerses) * 100) : 0;

	const pieData = [
		{
			value: progressPct,
			color: selectedTheme.primary,
			text: `${progressPct}%`,
		},
		{
			value: Math.max(0, 100 - progressPct),
			color: selectedTheme.secondary,
			text: `${Math.max(0, 100 - progressPct)}%`,
		},
	];

	const listData = surahs ?? [];

	// console.log({ dataBookmark, dataLastRead });

	return (
		<View
			accessible={true}
			accessibilityLabel={t("surahList.accessibility.section")}
		>
			<Card
				className="mb-2 p-4 border-transparent mx-4"
				style={{
					shadowColor: selectedTheme.primary,
					shadowOffset: { width: 0, height: 0 },
					shadowOpacity: 0.1,
					shadowRadius: 4,
				}}
				accessible={true}
				accessibilityRole="summary"
				accessibilityLabel={t("surahList.accessibility.lastReadingCard")}
			>
				<CardContent className="p-0">
					<View className="flex-row justify-between items-center">
						<View>
							<Text className="font-semibold text-lg">
								{t("surahList.lastReading")}
							</Text>
							<Text className="text-muted-foreground mt-1">
								{lastSurah?.nameTranslit ?? t("surahList.lastReadingUnknown")}
							</Text>
							{lastAyahNumber > 0 && totalVerses > 0 ? (
								<Text className="text-muted-foreground">
									{t("surahList.ayat")} {lastAyahNumber} {t("surahList.from")}{" "}
									{totalVerses}
								</Text>
							) : null}
						</View>
						<View
							style={{ width: 80, height: 80 }}
							accessible={true}
							accessibilityLabel={t("surahList.accessibility.progressChart", {
								percentage: `${progressPct}%`,
							})}
						>
							<PieChart
								data={pieData}
								donut
								radius={40}
								innerRadius={25}
								centerLabelComponent={() => (
									<Text style={{ fontSize: 14, fontWeight: "600" }}>
										{progressPct}%
									</Text>
								)}
								backgroundColor={
									isDarkMode ? themeColors.dark.card : themeColors.light.card
								}
							/>
						</View>
					</View>
				</CardContent>
			</Card>

			<View
				style={{
					height: Platform.OS === "ios" ? height - 200 : height - 160,
				}}
			>
				{isLoading || listData.length === 0 ? (
					<View className="px-4">
						{SKELETON_KEYS.map((key) => (
							<Card
								key={key}
								className="mb-2 border-transparent p-4"
								style={{
									shadowColor: selectedTheme.primary,
									shadowOffset: { width: 0, height: 0 },
									shadowOpacity: 0.1,
									shadowRadius: 4,
								}}
								accessible={true}
								accessibilityRole="progressbar"
								accessibilityLabel={t("surahList.accessibility.loadingItem")}
							>
								<CardContent className="p-0">
									<View className="flex-row justify-between items-center">
										<View className="flex-row items-center">
											<Skeleton
												style={{
													width: 40,
													height: 40,
													borderRadius: 20,
													marginRight: 12,
												}}
											/>
											<View className="space-y-1.5">
												<Skeleton style={{ width: 140, height: 16 }} />
												<Skeleton style={{ width: 100, height: 12 }} />
											</View>
										</View>
										<View className="items-end space-y-1.5">
											<Skeleton style={{ width: 80, height: 16 }} />
											<Skeleton style={{ width: 120, height: 16 }} />
										</View>
									</View>
								</CardContent>
							</Card>
						))}
						<View style={{ paddingBottom: insets.bottom + 200 }} />
					</View>
				) : (
					<FlashList
						data={listData}
						className="px-4"
						accessible={true}
						accessibilityRole="list"
						ListFooterComponent={
							<View
								style={{
									paddingBottom: insets.bottom + 200,
								}}
							/>
						}
						renderItem={({ item }) => (
							<Pressable
								onPress={() => router.push({ pathname: `/quran/${item.id}` })}
							>
								<Card
									className="mb-2 border-transparent p-4"
									style={{
										shadowColor: selectedTheme.primary,
										shadowOffset: { width: 0, height: 0 },
										shadowOpacity: 0.1,
										shadowRadius: 4,
									}}
									accessible={true}
									accessibilityRole="button"
									accessibilityLabel={t("surahList.accessibility.surahItem", {
										number: item.surahNumber,
										name: item.nameTranslit,
										meaning: item.meaning,
										verses: item.totalVerses,
									})}
								>
									<CardContent className="p-0">
										<View className="flex-row justify-between items-center">
											<View className="flex-row items-center">
												<View
													className="w-10 h-10 rounded-full items-center justify-center mr-3"
													style={{
														backgroundColor: selectedTheme.primary,
													}}
													accessible={true}
													accessibilityLabel={t(
														"surahList.accessibility.surahNumber",
														{ number: item.surahNumber },
													)}
												>
													<Text className="text-primary-foreground dark:text-foreground font-bold">
														{item.surahNumber}
													</Text>
												</View>
												<View>
													<Text
														className="font-semibold"
														accessible={true}
														accessibilityLabel={t(
															"surahList.accessibility.surahName",
															{
																name: item.nameTranslit,
																meaning: item.meaning,
															},
														)}
													>
														{item.nameTranslit}
													</Text>
													<Text className="text-muted-foreground text-sm">
														{item.meaning}
													</Text>
												</View>
											</View>
											<View className="items-end">
												<Text
													className="font-medium font-arabic"
													style={{
														color: selectedTheme.secondary,
													}}
												>
													{item.name}
												</Text>
												<Text
													className="font-semibold text-base"
													accessible={true}
													accessibilityLabel={t(
														"surahList.accessibility.verseCount",
														{ count: item.totalVerses },
													)}
												>
													{item.totalVerses} {t("surahList.ayat")}
												</Text>
											</View>
										</View>
									</CardContent>
								</Card>
							</Pressable>
						)}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</View>
		</View>
	);
}
