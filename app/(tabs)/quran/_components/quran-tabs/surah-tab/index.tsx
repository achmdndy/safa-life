import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import BookmarkList from "./bookmark-list";
import JuzList from "./juz-list";
import SurahList from "./surah-list";

export default function SurahTab() {
	const [value, setValue] = useState("surah");
	const { t } = useTranslation("quran");

	return (
		<Tabs value={value} onValueChange={setValue} className="mt-4">
			<TabsList
				className="mx-4"
				accessible={true}
				accessibilityRole="tablist"
				accessibilityLabel={t("surahTab.accessibility.subTabs")}
			>
				<TabsTrigger
					value="surah"
					className="w-1/3"
					accessible={true}
					accessibilityRole="tab"
					accessibilityLabel={t("surahTab.accessibility.surahSubTab")}
				>
					<Text>{t("surahTab.surah")}</Text>
				</TabsTrigger>
				<TabsTrigger
					value="juz"
					className="w-1/3"
					accessible={true}
					accessibilityRole="tab"
					accessibilityLabel={t("surahTab.accessibility.juzSubTab")}
				>
					<Text>{t("surahTab.juz")}</Text>
				</TabsTrigger>
				<TabsTrigger
					value="bookmark"
					className="w-1/3"
					accessible={true}
					accessibilityRole="tab"
					accessibilityLabel={t("surahTab.accessibility.bookmarkSubTab")}
				>
					<Text>{t("surahTab.bookmark")}</Text>
				</TabsTrigger>
			</TabsList>

			<TabsContent value="surah">
				<SurahList />
			</TabsContent>
			<TabsContent value="juz">
				<JuzList />
			</TabsContent>
			<TabsContent value="bookmark">
				<BookmarkList />
			</TabsContent>
		</Tabs>
	);
}
