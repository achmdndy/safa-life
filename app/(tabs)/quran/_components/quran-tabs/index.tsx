import { useState } from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { DailyRemainderTab } from "./daily-remainder-tab";
import { SurahTab } from "./surah-tab";
import { ThematicLearningTab } from "./thematic-learning-tab";

export function QuranTabs() {
	const [value, setValue] = useState("surah");
	const insets = useSafeAreaInsets();

	return (
		<View className="flex flex-1 w-full flex-col gap-6">
			<Tabs value={value} onValueChange={setValue} className="flex-1">
				<TabsList
					className="absolute z-10 justify-center self-center"
					style={{
						bottom: Platform.OS === "ios" ? insets.bottom + 65 : 10,
					}}
				>
					<TabsTrigger value="surah">
						<Text>Surah</Text>
					</TabsTrigger>
					<TabsTrigger value="thematic-learning">
						<Text>Topics</Text>
					</TabsTrigger>
					<TabsTrigger value="daily-remainder">
						<Text>Daily</Text>
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
