import { FlashList } from "@shopify/flash-list";
import { Bookmark, BookmarkX } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Alert, Dimensions, Platform, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import type { DtoBookmarkAyahResponse } from "@/api/coreService";
import { useBookmarkList } from "../../../_hooks/use-bookmark-list";
import { useQuranList } from "../../../_hooks/use-quran-list";
import { useGetQuranAyahsIdHook } from "@/api/coreService/hooks/ayahsController/useGetQuranAyahsIdHook";
import { useGetQuranAyahsSurahSurahidHook } from "@/api/coreService/hooks/ayahsController/useGetQuranAyahsSurahSurahidHook";
import { useDeleteQuranBookmarksAyahsIdHook } from "@/api/coreService/hooks/bookmarksController/useDeleteQuranBookmarksAyahsIdHook";
import { getQuranBookmarksAyahsQueryKey } from "@/api/coreService/hooks/bookmarksController/useGetQuranBookmarksAyahsHook";
import { useQueryClient } from "@tanstack/react-query";

export default function BookmarkList() {
	const { t } = useTranslation("quran");
	const insets = useSafeAreaInsets();
	const { height } = Dimensions.get("window");
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const queryClient = useQueryClient();

	const { dataBookmark, isLoadingBookmark } = useBookmarkList();
	const { surahs } = useQuranList();

	const bookmarks: DtoBookmarkAyahResponse[] = dataBookmark?.data?.data ?? [];

	const { mutate: deleteBookmark } = useDeleteQuranBookmarksAyahsIdHook({
		mutation: {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: getQuranBookmarksAyahsQueryKey({ limit: 0 }),
				});
			},
		},
	});

	const handleRemoveBookmark = (bookmark: DtoBookmarkAyahResponse) => {
		const id = bookmark.id;
		if (!id) return;
		Alert.alert(
			t("bookmarkList.removeBookmark"),
			t("bookmarkList.removeConfirmation"),
			[
				{ text: t("bookmarkList.cancel"), style: "cancel" },
				{
					text: t("bookmarkList.remove"),
					style: "destructive",
					onPress: () => deleteBookmark({ id }),
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
					count: bookmarks.length,
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
										{ count: bookmarks.length },
									)}
								>
									{t("bookmarkList.summary", { count: bookmarks.length })}
								</Text>
								{bookmarks.length > 0 ? (
									<LastBookmarkSummary
										bookmark={bookmarks[0]}
										surahLookup={surahs}
									/>
								) : null}
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
					data={bookmarks}
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
						<BookmarkItemCard
							bookmark={item}
							themePrimary={selectedTheme.primary}
							themeSecondary={selectedTheme.secondary}
							onRemove={() => handleRemoveBookmark(item)}
						/>
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

type BookmarkItemCardProps = {
	bookmark: DtoBookmarkAyahResponse;
	themePrimary: string;
	themeSecondary: string;
	onRemove: () => void;
};

function BookmarkItemCard({
	bookmark,
	themePrimary,
	themeSecondary,
	onRemove,
}: BookmarkItemCardProps) {
	const { t } = useTranslation("quran");

	const ayahId = bookmark.ayahId ?? "";
	const { data: ayahDetail } = useGetQuranAyahsIdHook(
		ayahId,
		{ include: "surah" },
		{
			query: { enabled: ayahId.length > 0, retry: 1 },
		},
	);

	const surahId = ayahDetail?.data?.surahId ?? "";
	const { data: surahAyahs } = useGetQuranAyahsSurahSurahidHook(
		surahId,
		{ limit: 0, include: "surah" },
		{ query: { enabled: surahId.length > 0, retry: 1 } },
	);

	const ayahs = surahAyahs?.data?.ayahs ?? [];
	const ayahIndex = ayahs.findIndex((a) => a.id === ayahId);
	const ayahNumber = ayahIndex >= 0 ? ayahIndex + 1 : undefined;
	const surahInfo = surahAyahs?.data?.surah;
	const surahNameTranslit = surahInfo?.nameEnglish ?? "";
	const surahNameArabic = surahInfo?.nameArabic ?? "";
	const totalAyat =
		surahInfo?.ayahCount ?? (ayahs.length > 0 ? ayahs.length : undefined);
	const text = ayahDetail?.data?.text ?? "";

	return (
		<Card
			className="mb-2 border-transparent p-4"
			style={{
				shadowColor: themePrimary,
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: 0.1,
				shadowRadius: 4,
			}}
			accessible={true}
			accessibilityLabel={t("bookmarkList.accessibility.item", {
				surah: surahNameTranslit,
				verse: ayahNumber ?? 0,
			})}
		>
			<CardContent className="p-0">
				<View className="mb-2 flex-row justify-between items-center">
					<View className="flex-row items-center">
						<View
							className="w-10 h-10 rounded-full items-center justify-center mr-3"
							style={{ backgroundColor: themePrimary }}
							accessible={true}
							accessibilityLabel={t("bookmarkList.accessibility.surahNumber", {
								number: surahNameTranslit,
							})}
						>
							<Text className="text-primary-foreground font-bold">
								{surahNameTranslit ? surahNameTranslit[0] : "?"}
							</Text>
						</View>
						<View>
							<Text
								className="font-semibold"
								accessible={true}
								accessibilityLabel={t("bookmarkList.accessibility.surahName", {
									name: surahNameTranslit,
								})}
							>
								{surahNameTranslit}
							</Text>
							<Text
								className="font-medium font-arabic"
								style={{ color: themeSecondary }}
								accessible={true}
								accessibilityLabel={t(
									"bookmarkList.accessibility.surahArabic",
									{ name: surahNameArabic },
								)}
							>
								{surahNameArabic}
							</Text>
						</View>
					</View>
					<View className="flex-row items-center gap-2">
						<View className="items-end mr-2">
							{typeof ayahNumber === "number" && (
								<Text
									className="font-semibold text-base"
									accessible={true}
									accessibilityLabel={t("bookmarkList.accessibility.verse", {
										number: ayahNumber,
									})}
								>
									{t("bookmarkList.verse", { number: ayahNumber })}
								</Text>
							)}
							{typeof totalAyat === "number" && (
								<Text className="text-muted-foreground text-xs">
									{t("bookmarkList.totalAyat", { count: totalAyat })}
								</Text>
							)}
						</View>
						{bookmark.id && (
							<Pressable
								onPress={onRemove}
								className="p-2 rounded-full"
								style={{ backgroundColor: `${themeSecondary}20` }}
								hitSlop={8}
								accessible={true}
								accessibilityRole="button"
								accessibilityLabel={t(
									"bookmarkList.accessibility.removeButton",
									{ surah: surahNameTranslit },
								)}
								accessibilityHint={t(
									"bookmarkList.accessibility.removeButtonHint",
								)}
							>
								<Icon as={BookmarkX} size={18} stroke={themePrimary} />
							</Pressable>
						)}
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
						accessibilityLabel={t("bookmarkList.accessibility.arabicText", {
							text,
						})}
					>
						{text}
					</Text>
				</View>
			</CardContent>
		</Card>
	);
}

type LastBookmarkSummaryProps = {
	bookmark: DtoBookmarkAyahResponse;
	surahLookup: Array<{
		id: string;
		surahNumber: number;
		name: string;
		nameTranslit: string;
		meaning: string;
		totalVerses: number;
	}>;
};

function LastBookmarkSummary({ bookmark }: LastBookmarkSummaryProps) {
	const { t } = useTranslation("quran");
	const ayahId = bookmark.ayahId ?? "";
	const { data: ayahDetail } = useGetQuranAyahsIdHook(
		ayahId,
		{ include: "surah" },
		{
			query: { enabled: ayahId.length > 0, retry: 1 },
		},
	);
	const surahId = ayahDetail?.data?.surahId ?? "";
	const { data: surahAyahs } = useGetQuranAyahsSurahSurahidHook(
		surahId,
		{ limit: 0, include: "surah" },
		{ query: { enabled: surahId.length > 0, retry: 1 } },
	);
	const ayahs = surahAyahs?.data?.ayahs ?? [];
	const ayahIndex = ayahs.findIndex((a) => a.id === ayahId);
	const ayahNumber = ayahIndex >= 0 ? ayahIndex + 1 : undefined;
	const surahNameTranslit = surahAyahs?.data?.surah?.nameEnglish ?? "";

	if (!surahNameTranslit || typeof ayahNumber !== "number") return null;

	return (
		<Text className="text-muted-foreground">
			{t("bookmarkList.lastBookmark", {
				surah: surahNameTranslit,
				verse: ayahNumber,
			})}
		</Text>
	);
}
