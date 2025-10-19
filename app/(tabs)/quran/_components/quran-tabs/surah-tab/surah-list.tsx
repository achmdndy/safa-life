import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Dimensions, Platform, Pressable, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";

export function SurahList() {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const { height } = Dimensions.get("window");
	const { currentTheme, theme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const isDarkMode = theme === "dark";
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);
	const { t } = useTranslation("quran");

	const pieData = [
		{ value: 25, color: selectedTheme.primary, text: "25%" },
		{ value: 75, color: selectedTheme.secondary, text: "75%" },
	];

	const surahData = [
		{
			id: 1,
			name: "الفاتحة",
			nameTranslit: "Al-Fatihah",
			meaning: "The Opening",
			totalVerses: 7,
		},
		{
			id: 2,
			name: "البقرة",
			nameTranslit: "Al-Baqarah",
			meaning: "The Cow",
			totalVerses: 286,
		},
		{
			id: 3,
			name: "آل عمران",
			nameTranslit: "Ali 'Imran",
			meaning: "Family of Imran",
			totalVerses: 200,
		},
		{
			id: 4,
			name: "النساء",
			nameTranslit: "An-Nisa",
			meaning: "The Women",
			totalVerses: 176,
		},
		{
			id: 5,
			name: "المائدة",
			nameTranslit: "Al-Ma'idah",
			meaning: "The Table Spread",
			totalVerses: 120,
		},
		{
			id: 6,
			name: "الأنعام",
			nameTranslit: "Al-An'am",
			meaning: "The Cattle",
			totalVerses: 165,
		},
		{
			id: 7,
			name: "الأعراف",
			nameTranslit: "Al-A'raf",
			meaning: "The Heights",
			totalVerses: 206,
		},
		{
			id: 8,
			name: "الأنفال",
			nameTranslit: "Al-Anfal",
			meaning: "The Spoils of War",
			totalVerses: 75,
		},
		{
			id: 9,
			name: "التوبة",
			nameTranslit: "At-Taubah",
			meaning: "The Repentance",
			totalVerses: 129,
		},
		{
			id: 10,
			name: "يونس",
			nameTranslit: "Yunus",
			meaning: "Jonah",
			totalVerses: 109,
		},
	];

	const allSurahData = Array.from({ length: 114 }, (_, index) => {
		if (index < surahData.length) {
			return surahData[index];
		}
		return {
			id: index + 1,
			name: `سورة`,
			nameTranslit: `Surah ${index + 1}`,
			meaning: "-",
			totalVerses: Math.floor(Math.random() * 200) + 1,
		};
	});

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
							<Text className="text-muted-foreground mt-1">Al-Baqarah</Text>
							<Text className="text-muted-foreground">
								{t("surahList.ayat")} 255 {t("surahList.from")} 286
							</Text>
						</View>
						<View
							style={{ width: 80, height: 80 }}
							accessible={true}
							accessibilityLabel={t("surahList.accessibility.progressChart", {
								percentage: "25%",
							})}
						>
							<PieChart
								data={pieData}
								donut
								radius={40}
								innerRadius={25}
								centerLabelComponent={() => {
									return (
										<Text style={{ fontSize: 14, fontWeight: "600" }}>25%</Text>
									);
								}}
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
				<FlashList
					data={allSurahData}
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
							onPress={() =>
								router.push({
									pathname: `/quran/${item.id}`,
								})
							}
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
									number: item.id,
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
													{ number: item.id },
												)}
											>
												<Text className="text-primary-foreground dark:text-foreground font-bold">
													{item.id}
												</Text>
											</View>
											<View>
												<Text
													className="font-semibold"
													accessible={true}
													accessibilityLabel={t(
														"surahList.accessibility.surahName",
														{ name: item.nameTranslit, meaning: item.meaning },
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
												className="font-medium"
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
			</View>
		</View>
	);
}
