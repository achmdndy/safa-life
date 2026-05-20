import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeCommunityInsights from "./_components/home-community-insights";
import HomeDailyDeen from "./_components/home-daily-deen";
import HomeEssentialTools from "./_components/home-essential-tools";
import HomeHeader from "./_components/home-header";
import HomePilgrimage from "./_components/home-pilgrimage";
import HomeSettings from "./_components/home-settings";
import HomeSpiritualJourney from "./_components/home-spiritual-journey";
import HomeSuggested from "./_components/home-suggested";

export default function HomeSearchScreen() {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-background h-full">
			<HomeHeader />
			<ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: Platform.OS === "ios" ? insets.bottom : 20,
				}}
			>
				<HomeSuggested />
				<HomeDailyDeen />
				<HomeSpiritualJourney />
				<HomeCommunityInsights />
				<HomeEssentialTools />
				<HomePilgrimage />
				<HomeSettings />
			</ScrollView>
		</View>
	);
}
