import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { Dimensions, Platform, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";
import { useJuzList } from "../../../_hooks/use-juz-list";
import { useQuranList } from "../../../_hooks/use-quran-list";
import { useProgressHatam } from "../../..//_hooks/use-progress-hatam";
import type { DtoJuzWithProgressBasicResponse } from "@/api/coreService/types/dto/JuzWithProgressBasicResponse.ts";
import type { DtoProgressHatamResponse } from "@/api/coreService/types/dto/ProgressHatamResponse.ts";

type JuzListItem = {
	id: string;
	number: number;
	startSurahName: string;
	endSurahName: string;
	progressPct: number;
};

export default function JuzList() {
	const insets = useSafeAreaInsets();
	const { height } = Dimensions.get("window");
	const { currentTheme, theme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const isDarkMode = theme === "dark";
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);
	const { t } = useTranslation("quran");
	const { dataJuzList, isLoadingJuzList } = useJuzList();
	const { surahs } = useQuranList();
	const { dataProgress } = useProgressHatam();

	const surahNameById = new Map<string, string>(
		(surahs ?? []).map((s) => [s.id, s.nameTranslit]),
	);

	const rawJuz: DtoJuzWithProgressBasicResponse[] =
		dataJuzList?.data?.data ?? [];

	const juzData: JuzListItem[] = rawJuz.map((item, idx) => {
		const startSurahName = item.juz?.startSurahId
			? (surahNameById.get(item.juz.startSurahId) ?? "")
			: "";
		const endSurahName = item.juz?.endSurahId
			? (surahNameById.get(item.juz.endSurahId) ?? "")
			: "";
		return {
			id: item.juz?.id ?? `${idx + 1}`,
			number: idx + 1,
			startSurahName,
			endSurahName,
			progressPct: Math.floor(item.progressHatam?.progressPct ?? 0),
		};
	});

	const progressList: DtoProgressHatamResponse[] =
		dataProgress?.data?.data ?? [];
	const totalJuz = 30;
	const sumProgress = progressList.reduce(
		(acc, j) => acc + (j.progressPct ?? 0),
		0,
	);
	const overallPct = Math.max(
		0,
		Math.min(100, Math.floor(sumProgress / totalJuz)),
	);
	const completedCount = progressList.filter(
		(p) => p.isCompleted === true,
	).length;
	const pieData = [
		{ value: overallPct, color: selectedTheme.primary, text: `${overallPct}%` },
		{
			value: 100 - overallPct,
			color: selectedTheme.secondary,
			text: `${100 - overallPct}%`,
		},
	];

	return (
		<View
			accessible={true}
			accessibilityLabel={t("juzList.accessibility.section")}
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
				accessibilityLabel={t("juzList.accessibility.progressCard")}
			>
				<CardContent className="p-0">
					<View className="flex-row items-center gap-4">
						<View
							style={{ width: 80, height: 80 }}
							accessible={true}
							accessibilityLabel={t("juzList.accessibility.progressChart", {
								completed: 3,
								total: 30,
							})}
						>
							<PieChart
								data={pieData}
								donut
								radius={40}
								innerRadius={25}
								centerLabelComponent={() => {
									return (
										<Text style={{ fontSize: 14, fontWeight: "600" }}>10%</Text>
									);
								}}
								backgroundColor={
									isDarkMode ? themeColors.dark.card : themeColors.light.card
								}
							/>
						</View>
						<View>
							<Text className="font-semibold text-lg">
								{t("juzList.progressKhatam")}
							</Text>
							<Text className="text-muted-foreground mt-1">
								{completedCount} {t("juzList.of")} {totalJuz} {t("juzList.juz")}
							</Text>
							<Text className="text-muted-foreground">
								{t("juzList.last")}: {(() => {
									// Find the most recently updated progress entry
									const sorted = [...progressList].sort((a, b) => {
										const aTime = a.updatedAt ?? a.startedAt ?? "";
										const bTime = b.updatedAt ?? b.startedAt ?? "";
										return aTime < bTime ? 1 : aTime > bTime ? -1 : 0;
									});
									const last = sorted[0];
									if (!last) return `${t("juzList.juz")} -`;
									const idx = rawJuz.findIndex((j) => j.juz?.id === last.juzId);
									const num = idx >= 0 ? idx + 1 : 0;
									const endName =
										idx >= 0 ? (juzData[idx]?.endSurahName ?? "") : "";
									return `${t("juzList.juz")} ${num}${endName ? ` (${endName})` : ""}`;
								})()}
							</Text>
						</View>
					</View>
				</CardContent>
			</Card>

			<View
				style={{
					height: Platform.OS === "ios" ? height - 200 : height - 160,
				}}
			>
				<FlashList
					data={juzData}
					className="px-4"
					scrollEventThrottle={16}
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
							accessibilityLabel={t("juzList.accessibility.juzItem", {
								name: `${t("juzList.juz")} ${item.number}`,
								startSurah: item.startSurahName,
								endSurah: item.endSurahName,
								progress: item.progressPct,
							})}
						>
							<CardContent className="p-0">
								<View className="flex-row justify-between items-center">
									<View className="flex-row items-center">
										<View
											style={{ backgroundColor: selectedTheme.primary }}
											className="w-10 h-10 rounded-full items-center justify-center mr-3"
											accessible={true}
											accessibilityLabel={t("juzList.accessibility.juzNumber", {
												number: item.number,
											})}
										>
											<Text className="text-primary-foreground dark:text-foreground font-bold">
												{item.number}
											</Text>
										</View>
										<View>
											<Text className="font-semibold">
												{t("juzList.juz")} {item.number}
											</Text>
											<Text
												className="text-muted-foreground text-sm"
												accessible={true}
												accessibilityLabel={t(
													"juzList.accessibility.juzRange",
													{
														startSurah: item.startSurahName,
														endSurah: item.endSurahName,
													},
												)}
											>
												{item.startSurahName}
												{item.startSurahName !== item.endSurahName
													? ` - ${item.endSurahName}`
													: ""}
											</Text>
										</View>
									</View>
									<View className="items-end">
										<Text
											className="text-muted-foreground"
											accessible={true}
											accessibilityLabel={t(
												"juzList.accessibility.juzProgress",
												{ progress: item.progressPct },
											)}
										>
											{item.progressPct}%
										</Text>
										<View className="bg-gray-200 w-16 h-1 mt-1 rounded-full overflow-hidden">
											<View
												className="h-full rounded-full"
												style={{
													width: `${item.progressPct}%`,
													backgroundColor: selectedTheme.primary,
												}}
											/>
										</View>
									</View>
								</View>
							</CardContent>
						</Card>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
}
