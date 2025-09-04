import { ScrollView, View } from "react-native";
import { ChairityHeader } from "./_components/charity-header";
import { ChairityGivePurpose } from "./_components/chairity-give-purpose";
import { ChairityCalculateZakat } from "./_components/chairity-calculate-zakat";
import { ChairityCommunity } from "./_components/chairity-community";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CharityScreen() {
	const insets = useSafeAreaInsets()
	
	return (
		<View className="flex-1 bg-background h-full">
			<ChairityHeader/>
			<ScrollView
				scrollEventThrottle={5}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}
				>
				<ChairityGivePurpose/>
				<ChairityCalculateZakat />
				<ChairityCommunity />
			</ScrollView>
		</View>
	);
}
