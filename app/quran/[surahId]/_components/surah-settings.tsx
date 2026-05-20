import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { type RefObject, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	BottomSheet,
	BottomSheetContent,
	BottomSheetScrollView,
} from "@/components/bottom-sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import AudioSettingsTab from "./surah-settings-tabs/audio-settings-tab";
import DisplaySettingsTab from "./surah-settings-tabs/display-settings-tab";
import TextSettingsTab from "./surah-settings-tabs/text-settings-tab";

interface SurahSettingsProps {
	sheetRef: RefObject<BottomSheetModal>;
}

export default function SurahSettings({ sheetRef }: SurahSettingsProps) {
	const [value, setValue] = useState("audio");
	const { bottom } = useSafeAreaInsets();

	return (
		<BottomSheet>
			<BottomSheetContent ref={sheetRef} snapPoints={["40%", "80%"]}>
				<Tabs value={value} onValueChange={setValue} className="flex-1 mt-4">
					<TabsList className="mx-4">
						<TabsTrigger value="audio" className="w-1/3">
							<Text>Audio</Text>
						</TabsTrigger>
						<TabsTrigger value="text" className="w-1/3">
							<Text>Text</Text>
						</TabsTrigger>
						<TabsTrigger value="display" className="w-1/3">
							<Text>Display</Text>
						</TabsTrigger>
					</TabsList>

					<BottomSheetScrollView
						contentContainerStyle={{ paddingBottom: bottom + 24 }}
					>
						<TabsContent value="audio">
							<AudioSettingsTab />
						</TabsContent>
						<TabsContent value="text">
							<TextSettingsTab
								onRequestCloseSheet={() => sheetRef.current?.dismiss()}
							/>
						</TabsContent>
						<TabsContent value="display">
							<DisplaySettingsTab />
						</TabsContent>
					</BottomSheetScrollView>
				</Tabs>
			</BottomSheetContent>
		</BottomSheet>
	);
}
