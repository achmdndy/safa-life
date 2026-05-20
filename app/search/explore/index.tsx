import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExploreArticles from "./_components/explore-articles";
import ExploreHeader from "./_components/explore-header";
import ExploreReels from "./_components/explore-reels";
import ExploreSuggested from "./_components/explore-suggested";

export default function ExploreSearchScreen() {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-background h-full">
			<ExploreHeader />
			<ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: Platform.OS === "ios" ? insets.bottom : 20,
				}}
			>
				<ExploreSuggested />
				<ExploreReels />
				<ExploreArticles />
			</ScrollView>
		</View>
	);
}
