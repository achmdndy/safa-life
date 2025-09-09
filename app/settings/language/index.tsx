import { ScrollView, View } from "react-native";
import { useLanguage } from "@/contexts/language-context";
import { LanguageHeader } from "./_components/language-header";
import { LanguageSelector } from "./_components/language-selector";

export default function LanguageScreen() {
	const { isRTL } = useLanguage();

	return (
		<View
			className="bg-background flex-1"
			style={{ direction: isRTL ? "rtl" : "ltr" }}
		>
			<LanguageHeader />
			<ScrollView
				className="flex-1"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
			>
				<LanguageSelector />
			</ScrollView>
		</View>
	);
}
