import { Animated, FlatList, StatusBar, View } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollIndicator from "./_components/scroll-indicator";
import SurahFooter from "./_components/surah-footer";
import SurahHeader from "./_components/surah-header";
import SurahSettings from "./_components/surah-settings";
import VerseItem from "./_components/verse-item";
import { useSurahAyahs } from "./_hooks/use-surah-ayahs";
import { useLastRead } from "./_hooks/use-last-read";

const SKELETON_KEYS = [
	"ayah-skeleton-01",
	"ayah-skeleton-02",
	"ayah-skeleton-03",
	"ayah-skeleton-04",
	"ayah-skeleton-05",
	"ayah-skeleton-06",
	"ayah-skeleton-07",
	"ayah-skeleton-08",
	"ayah-skeleton-09",
	"ayah-skeleton-10",
];

export default function SurahDetailScreen() {
	const {
		surahId,
		surah,
		top,
		totalHeaderHeight,
		verses,
		headerTranslateY,
		footerTranslateY,
		listFooterHeight,
		handleScroll,
		handleScrollEnd,
		canNavPrev,
		canNavNext,
		isTopIndicatorVisible,
		isBottomIndicatorVisible,
		prevSurahDisplayNumber,
		nextSurahDisplayNumber,
		onBookmarkToggle,
		onReadToggle,
		onPlayAudio,
		onNextVerse,
		onPrevVerse,
		onNextSurah,
		onPrevSurah,
		onPressSettings,
		settingsSheetRef,
		isLoadingAyahs,
		listRef,
		isPlaying,
		currentVerseIndex,
	} = useSurahAyahs();

	// Auto last-read tracking based on visible ayahs
	const { viewabilityConfig, onViewableItemsChanged, setSurahId } = useLastRead(
		surahId as unknown as string,
	);
	// Ensure surahId is set in the tracker when it changes
	// biome-ignore lint: correctness/useExhaustiveDependencies
	// @ts-ignore
	if (surahId) setSurahId(String(surahId));

	return (
		<View className="flex-1 bg-background">
			<StatusBar barStyle="dark-content" />

			<SurahHeader
				surahId={surahId}
				surah={surah}
				headerTranslateY={headerTranslateY}
				topInset={top}
				isLoading={isLoadingAyahs}
			/>

			{isLoadingAyahs || verses.length === 0 ? (
				<Animated.ScrollView
					onScroll={handleScroll}
					onScrollEndDrag={handleScrollEnd}
					scrollEventThrottle={16}
					contentContainerStyle={{ paddingTop: totalHeaderHeight }}
				>
					{SKELETON_KEYS.map((key) => (
						<View key={key} className="p-4 border-b border-border">
							<View className="flex-row justify-between items-center mb-2">
								<Skeleton className="h-6 w-12" />
							</View>
							<Skeleton className="h-7 w-full rounded mb-2" />
							<Skeleton className="h-4 w-3/4 rounded" />
						</View>
					))}

					<View>
						{isBottomIndicatorVisible && nextSurahDisplayNumber !== null ? (
							<ScrollIndicator
								text={
									canNavNext
										? `Release to go to Surah ${nextSurahDisplayNumber}`
										: `Push to go to Surah ${nextSurahDisplayNumber}`
								}
							/>
						) : null}
						<Animated.View style={{ height: listFooterHeight }} />
					</View>
				</Animated.ScrollView>
			) : (
				<FlatList
					ref={listRef}
					data={verses}
					keyExtractor={(item) => item.id}
					onScroll={handleScroll}
					onScrollEndDrag={handleScrollEnd}
					scrollEventThrottle={16}
					viewabilityConfig={viewabilityConfig}
					onViewableItemsChanged={onViewableItemsChanged}
					contentContainerStyle={{ paddingTop: totalHeaderHeight }}
					renderItem={({ item, index }) => {
						return (
							<VerseItem
								item={item}
								isActive={isPlaying && index === currentVerseIndex}
								onBookmarkToggle={onBookmarkToggle}
								onReadToggle={onReadToggle}
							/>
						);
					}}
					ListHeaderComponent={
						isTopIndicatorVisible && prevSurahDisplayNumber !== null ? (
							<ScrollIndicator
								text={
									canNavPrev
										? `Release to go to Surah ${prevSurahDisplayNumber}`
										: `Pull to go to Surah ${prevSurahDisplayNumber}`
								}
							/>
						) : null
					}
					ListFooterComponent={
						<View>
							{isBottomIndicatorVisible && nextSurahDisplayNumber !== null ? (
								<ScrollIndicator
									text={
										canNavNext
											? `Release to go to Surah ${nextSurahDisplayNumber}`
											: `Push to go to Surah ${nextSurahDisplayNumber}`
									}
								/>
							) : null}
							<Animated.View style={{ height: listFooterHeight }} />
						</View>
					}
				/>
			)}

			<SurahFooter
				footerTranslateY={footerTranslateY}
				onPlayAudio={onPlayAudio}
				onNextVerse={onNextVerse}
				onPrevVerse={onPrevVerse}
				onNextSurah={onNextSurah}
				onPrevSurah={onPrevSurah}
				onPressSettings={onPressSettings}
				settingsSheetRef={settingsSheetRef}
				isPlaying={isPlaying}
			/>

			<SurahSettings sheetRef={settingsSheetRef} />
		</View>
	);
}
