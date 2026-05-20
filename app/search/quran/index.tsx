import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QuranFeatures from "./_components/quran-features";
import QuranFeels from "./_components/quran-feels";
import QuranHeader from "./_components/quran-header";
import QuranStories from "./_components/quran-stories";

export default function QuranSearchScreen() {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-background h-full">
			<QuranHeader />
			<ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: Platform.OS === "ios" ? insets.bottom : 20,
				}}
			>
				<QuranFeatures />
				<QuranStories />
				<QuranFeels />
			</ScrollView>
		</View>
	);
}
