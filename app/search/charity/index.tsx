import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CharityCommunity } from "./_components/charity-community";
import { CharityHeader } from "./_components/charity-header";
import { CharitySuggested } from "./_components/charity-suggested";

export default function CharitySearchScreen() {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-background h-full">
			<CharityHeader />
			<ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: Platform.OS === "ios" ? insets.bottom : 20,
				}}
			>
				<CharitySuggested />
				<CharityCommunity />
			</ScrollView>
		</View>
	);
}
