import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AccessibilityInfo, View } from "react-native";
import QuranHeader from "./_components/quran-header";
import QuranTabs from "./_components/quran-tabs";

export default function QuranScreen() {
	const { t } = useTranslation("quran");

	useEffect(() => {
		AccessibilityInfo.announceForAccessibility(
			t("accessibility.welcomeAnnouncement"),
		);
	}, [t]);

	return (
		<View className="flex-1 bg-background h-full">
			<QuranHeader />
			<QuranTabs />
		</View>
	);
}
