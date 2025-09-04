import { ScrollView, View } from "react-native";
import { ExploreHeader } from "./_components/explore-header";
import { ExploreReels } from "./_components/explore-reels";
import { ExploreHijrahProgram } from "./_components/explore-hijrah-program";
import { ExploreEvent } from "./_components/explore-event";
import { ExploreDiscoverMore } from "./_components/explore-discover-more";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View className="flex-1 bg-background h-full">
			<ExploreHeader/>
			<ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}
			>
				<ExploreReels/>
				<ExploreHijrahProgram/>
				<ExploreEvent/>
				<ExploreDiscoverMore/>
			</ScrollView>
		</View>
	);
}
