import { FlashList } from "@shopify/flash-list";
import { Bookmark, BookmarkX } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Dimensions, Platform, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

export function BookmarkList() {
	const { t } = useTranslation("quran");
	const insets = useSafeAreaInsets();
	const { height } = Dimensions.get("window");
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	const [bookmarkData, setBookmarkData] = useState([
		{
			id: 1,
			surahId: 2,
			surahName: "البقرة",
			surahNameTranslit: "Al-Baqarah",
			ayatNumber: 255,
			totalAyat: 286,
			lastRead: "2 days ago",
			text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ",
		},
		{
			id: 2,
			surahId: 36,
			surahName: "يس",
			surahNameTranslit: "Yasin",
			ayatNumber: 1,
			totalAyat: 83,
			lastRead: "1 week ago",
			text: "يس",
		},
		{
			id: 3,
			surahId: 55,
			surahName: "الرحمن",
			surahNameTranslit: "Ar-Rahman",
			ayatNumber: 33,
			totalAyat: 78,
			lastRead: "2 weeks ago",
			text: "يَا مَعْشَرَ الْجِنِّ وَالْإِنسِ إِنِ اسْتَطَعْتُمْ أَن تَنفُذُوا مِنْ أَقْطَارِ السَّمَاوَاتِ وَالْأَرْضِ فَانفُذُوا ۚ",
		},
		{
			id: 4,
			surahId: 1,
			surahName: "الفاتحة",
			surahNameTranslit: "Al-Fatihah",
			ayatNumber: 1,
			totalAyat: 7,
			lastRead: "3 weeks ago",
			text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
		},
		{
			id: 5,
			surahId: 112,
			surahName: "الإخلاص",
			surahNameTranslit: "Al-Ikhlas",
			ayatNumber: 1,
			totalAyat: 4,
			lastRead: "1 month ago",
			text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
		},
	]);

	const removeBookmark = (id: number) => {
		Alert.alert(
			t("bookmarkList.removeBookmark"),
			t("bookmarkList.removeConfirmation"),
			[
				{
					text: t("bookmarkList.cancel"),
					style: "cancel",
				},
				{
					text: t("bookmarkList.remove"),
					onPress: () => {
						setBookmarkData(bookmarkData.filter((item) => item.id !== id));
					},
					style: "destructive",
				},
			],
		);
	};

	return (
		<View
			accessible={true}
			accessibilityLabel={t("bookmarkList.accessibility.section")}
		>
			<Card
				className="mb-2 p-4 border-transparent mx-4"
				style={{
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 0 },
					shadowOpacity: 0.1,
					shadowRadius: 4,
				}}
				accessible={true}
				accessibilityLabel={t("bookmarkList.accessibility.summaryCard", {
					count: bookmarkData.length,
				})}
			>
				<CardContent className="p-0">
					<View className="flex-row justify-between items-center">
						<View className="flex-row items-center">
							<View
								className="w-10 h-10 rounded-full items-center justify-center mr-3"
								style={{ backgroundColor: selectedTheme.primary }}
								accessible={true}
								accessibilityLabel={t("bookmarkList.accessibility.icon")}
							>
								<Icon
									as={Bookmark}
									size={20}
									className="text-primary-foreground dark:text-foreground"
								/>
							</View>
							<View>
								<Text
									className="font-semibold text-lg"
									accessible={true}
									accessibilityLabel={t("bookmarkList.title")}
								>
									{t("bookmarkList.title")}
								</Text>
								<Text
									className="text-muted-foreground mt-1"
									accessible={true}
									accessibilityLabel={t(
										"bookmarkList.accessibility.summaryText",
										{ count: bookmarkData.length },
									)}
								>
									{t("bookmarkList.summary", { count: bookmarkData.length })}
								</Text>
								{bookmarkData.length > 0 && (
									<Text
										className="text-muted-foreground"
										accessible={true}
										accessibilityLabel={t(
											"bookmarkList.accessibility.lastBookmark",
											{
												surah: bookmarkData[0].surahNameTranslit,
												verse: bookmarkData[0].ayatNumber,
											},
										)}
									>
										{t("bookmarkList.lastBookmark", {
											surah: bookmarkData[0].surahNameTranslit,
											verse: bookmarkData[0].ayatNumber,
										})}
									</Text>
								)}
							</View>
						</View>
					</View>
				</CardContent>
			</Card>

			<View
				style={{
					height: Platform.OS === "ios" ? height - 200 : height - 170,
				}}
			>
				<FlashList
					data={bookmarkData}
					className="px-4"
					accessible={true}
					accessibilityLabel={t("bookmarkList.accessibility.list")}
					accessibilityHint={t("bookmarkList.accessibility.listHint")}
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
							accessibilityLabel={t("bookmarkList.accessibility.item", {
								surah: item.surahNameTranslit,
								verse: item.ayatNumber,
								lastRead: item.lastRead,
							})}
						>
							<CardContent className="p-0">
								<View className="mb-2 flex-row justify-between items-center">
									<View className="flex-row items-center">
										<View
											className="w-10 h-10 rounded-full items-center justify-center mr-3"
											style={{ backgroundColor: selectedTheme.primary }}
											accessible={true}
											accessibilityLabel={t(
												"bookmarkList.accessibility.surahNumber",
												{ number: item.surahId },
											)}
										>
											<Text className="text-primary-foreground font-bold">
												{item.surahId}
											</Text>
										</View>
										<View>
											<Text
												className="font-semibold"
												accessible={true}
												accessibilityLabel={t(
													"bookmarkList.accessibility.surahName",
													{ name: item.surahNameTranslit },
												)}
											>
												{item.surahNameTranslit}
											</Text>
											<Text
												className="font-medium"
												style={{ color: selectedTheme.secondary }}
												accessible={true}
												accessibilityLabel={t(
													"bookmarkList.accessibility.surahArabic",
													{ name: item.surahName },
												)}
											>
												{item.surahName}
											</Text>
										</View>
									</View>
									<View className="flex-row items-center gap-2">
										<View className="items-end mr-2">
											<Text
												className="font-semibold text-base"
												accessible={true}
												accessibilityLabel={t(
													"bookmarkList.accessibility.verse",
													{ number: item.ayatNumber },
												)}
											>
												{t("bookmarkList.verse", { number: item.ayatNumber })}
											</Text>
											<Text
												className="text-muted-foreground text-xs"
												accessible={true}
												accessibilityLabel={t(
													"bookmarkList.accessibility.lastRead",
													{ time: item.lastRead },
												)}
											>
												{item.lastRead}
											</Text>
										</View>
										<Pressable
											onPress={() => removeBookmark(item.id)}
											className="p-2 rounded-full"
											style={{
												backgroundColor: `${selectedTheme.secondary}20`,
											}}
											hitSlop={8}
											accessible={true}
											accessibilityRole="button"
											accessibilityLabel={t(
												"bookmarkList.accessibility.removeButton",
												{ surah: item.surahNameTranslit },
											)}
											accessibilityHint={t(
												"bookmarkList.accessibility.removeButtonHint",
											)}
										>
											<Icon
												as={BookmarkX}
												size={18}
												stroke={selectedTheme.primary}
											/>
										</Pressable>
									</View>
								</View>

								<View
									className="bg-gray-50 dark:bg-background/50 p-3 rounded-lg mt-2"
									accessible={true}
									accessibilityLabel={t("bookmarkList.accessibility.verseText")}
								>
									<Text
										className="text-right text-lg font-arabic"
										style={{ lineHeight: 32 }}
										accessible={true}
										accessibilityLabel={t(
											"bookmarkList.accessibility.arabicText",
											{ text: item.text },
										)}
									>
										{item.text}
									</Text>
								</View>
							</CardContent>
						</Card>
					)}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={
						<View
							className="items-center justify-center p-8"
							accessible={true}
							accessibilityLabel={t("bookmarkList.accessibility.emptyState")}
						>
							<Icon as={Bookmark} size={40} className="text-gray-300 mb-4" />
							<Text
								className="text-muted-foreground text-center"
								accessible={true}
								accessibilityLabel={t("bookmarkList.emptyState.title")}
							>
								{t("bookmarkList.emptyState.title")}
							</Text>
							<Text
								className="text-muted-foreground text-center text-sm"
								accessible={true}
								accessibilityLabel={t("bookmarkList.emptyState.message")}
							>
								{t("bookmarkList.emptyState.message")}
							</Text>
						</View>
					}
				/>
			</View>
		</View>
	);
}
