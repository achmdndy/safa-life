import { Animated, StatusBar, View } from "react-native";
import { ScrollIndicator } from "./_components/scroll-indicator";
import { SurahFooter } from "./_components/surah-footer";
import { SurahHeader } from "./_components/surah-header";
import { SurahSettings } from "./_components/surah-settings";
import { VerseItem } from "./_components/verse-item";
import { useSurahScreen } from "./_hooks/use-surah-screen";

export default function SurahDetailScreen() {
	const {
		surahId,
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
		prevSurahId,
		nextSurahId,
		onBookmarkToggle,
		onReadToggle,
		onPlayAudio,
		onNextVerse,
		onPrevVerse,
		onPressInfo,
		onPressSettings,
		settingsSheetRef,
	} = useSurahScreen();

	return (
		<View className="flex-1 bg-background">
			<StatusBar barStyle="dark-content" />

			<SurahHeader
				surahId={surahId}
				headerTranslateY={headerTranslateY}
				topInset={top}
				onPressInfo={onPressInfo}
			/>

			<Animated.FlatList
				data={verses}
				keyExtractor={(item) => item.id.toString()}
				onScroll={handleScroll}
				onScrollEndDrag={handleScrollEnd}
				scrollEventThrottle={16}
				contentContainerStyle={{ paddingTop: totalHeaderHeight }}
				renderItem={({ item }) => (
					<VerseItem
						item={item}
						onBookmarkToggle={onBookmarkToggle}
						onReadToggle={onReadToggle}
					/>
				)}
				ListHeaderComponent={
					isTopIndicatorVisible && prevSurahId > 0 ? (
						<ScrollIndicator
							text={
								canNavPrev
									? `Release to go to Surah ${prevSurahId}`
									: `Pull to go to Surah ${prevSurahId}`
							}
						/>
					) : null
				}
				ListFooterComponent={
					<View>
						{isBottomIndicatorVisible && nextSurahId <= 114 ? (
							<ScrollIndicator
								text={
									canNavNext
										? `Release to go to Surah ${nextSurahId}`
										: `Push to go to Surah ${nextSurahId}`
								}
							/>
						) : null}
						<Animated.View style={{ height: listFooterHeight }} />
					</View>
				}
			/>

			<SurahFooter
				footerTranslateY={footerTranslateY}
				onPlayAudio={onPlayAudio}
				onNextVerse={onNextVerse}
				onPrevVerse={onPrevVerse}
				onPressSettings={onPressSettings}
				settingsSheetRef={settingsSheetRef}
			/>

			<SurahSettings sheetRef={settingsSheetRef} />
		</View>
	);
}
