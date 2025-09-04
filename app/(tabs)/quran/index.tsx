import { Text, View } from "react-native";
import { QuranTabs } from "./_components/quran-tabs";
import { QuranHeader } from "./_components/quran-header";

export default function QuranScreen() {
	return (
		<View className="flex-1 bg-background h-full">
			<QuranHeader />
			<QuranTabs />
		</View>
	);
}
