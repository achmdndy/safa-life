import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { BookmarkList } from "./bookmark-list";
import { JuzList } from "./juz-list";
import { SurahList } from "./surah-list";

export function SurahTab() {
	const [value, setValue] = useState("surah");

	return (
		<Tabs value={value} onValueChange={setValue} className="mt-4">
			<TabsList className="mx-4">
				<TabsTrigger value="surah" className="w-1/3">
					<Text>Surah</Text>
				</TabsTrigger>
				<TabsTrigger value="juz" className="w-1/3">
					<Text>Juz</Text>
				</TabsTrigger>
				<TabsTrigger value="bookmark" className="w-1/3">
					<Text>Bookmark</Text>
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
