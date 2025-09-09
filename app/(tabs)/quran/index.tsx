import { View } from "react-native";
import { QuranHeader } from "./_components/quran-header";
import { QuranTabs } from "./_components/quran-tabs";

export default function QuranScreen() {
	return (
		<View className="flex-1 bg-background h-full">
			<QuranHeader />
			<QuranTabs />
		</View>
	);
}
