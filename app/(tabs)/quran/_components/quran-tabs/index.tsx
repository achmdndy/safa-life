import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import DailyRemainderTab from "./daily-remainder-tab";
import SurahTab from "./surah-tab";
import ThematicLearningTab from "./thematic-learning-tab";

export default function QuranTabs() {
	const [value, setValue] = useState("surah");
	const insets = useSafeAreaInsets();
	const { t } = useTranslation("quran");

	return (
		<View
			className="flex flex-1 w-full flex-col gap-6"
			accessible={true}
			accessibilityLabel={t("accessibility.mainContent")}
		>
			<Tabs value={value} onValueChange={setValue} className="flex-1">
				<TabsList
					className="absolute z-10 justify-center self-center"
					style={{
						bottom: Platform.OS === "ios" ? insets.bottom + 65 : 10,
					}}
					accessible={true}
					accessibilityRole="tablist"
					accessibilityLabel={t("tabs.accessibility.mainTabs")}
				>
					<TabsTrigger
						value="surah"
						accessible={true}
						accessibilityRole="tab"
						accessibilityLabel={t("tabs.accessibility.surahTab")}
					>
						<Text>{t("tabs.surah")}</Text>
					</TabsTrigger>
					<TabsTrigger
						value="thematic-learning"
						accessible={true}
						accessibilityRole="tab"
						accessibilityLabel={t("tabs.accessibility.topicsTab")}
					>
						<Text>{t("tabs.topics")}</Text>
					</TabsTrigger>
					<TabsTrigger
						value="daily-remainder"
						accessible={true}
						accessibilityRole="tab"
						accessibilityLabel={t("tabs.accessibility.dailyTab")}
					>
						<Text>{t("tabs.daily")}</Text>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="surah">
					<SurahTab />
				</TabsContent>
				<TabsContent value="thematic-learning">
					<ThematicLearningTab />
				</TabsContent>
				<TabsContent value="daily-remainder">
					<DailyRemainderTab />
				</TabsContent>
			</Tabs>
		</View>
	);
}
