import { BookOpen } from "lucide-react-native";
import { useMemo } from "react";
import { View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import QuranContentCard from "./quran-content-card";

export const stories = [
	{ title: "Adam AS", slug: "adam" },
	{ title: "Idris AS", slug: "idris" },
	{ title: "Nuh AS", slug: "nuh" },
	{ title: "Hud AS", slug: "hud" },
	{ title: "Salih AS", slug: "salih" },
	{ title: "Ibrahim AS", slug: "ibrahim" },
	{ title: "Lut AS", slug: "lut" },
	{ title: "Ismail AS", slug: "ismail" },
	{ title: "Ishaq AS", slug: "ishaq" },
	{ title: "Yaqub AS", slug: "yaqub" },
	{ title: "Yusuf AS", slug: "yusuf" },
	{ title: "Ayyub AS", slug: "ayyub" },
	{ title: "Syuaib AS", slug: "syuaib" },
	{ title: "Musa AS", slug: "musa" },
	{ title: "Harun AS", slug: "harun" },
	{ title: "Dzulkifli AS", slug: "dzulkifli" },
	{ title: "Daud AS", slug: "daud" },
	{ title: "Sulaiman AS", slug: "sulaiman" },
	{ title: "Ilyas AS", slug: "ilyas" },
	{ title: "Ilyasa AS", slug: "ilyasa" },
	{ title: "Yunus AS", slug: "yunus" },
	{ title: "Zakariya AS", slug: "zakariya" },
	{ title: "Yahya AS", slug: "yahya" },
	{ title: "Isa AS", slug: "isa" },
	{ title: "Muhammad SAW", slug: "muhammad" },
];

export default function QuranStories() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	const randomStories = useMemo(() => {
		const shuffled = [...stories].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 8);
	}, []);

	return (
		<View className="gap-2 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={BookOpen}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Prophet Stories</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-start gap-2 px-4 py-2">
				{randomStories.map((item) => (
					<QuranContentCard key={item.slug} title={item.title} />
				))}
			</View>
		</View>
	);
}
