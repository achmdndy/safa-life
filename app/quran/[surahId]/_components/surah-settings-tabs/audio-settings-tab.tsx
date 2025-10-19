import { useActionSheet } from "@expo/react-native-action-sheet";
import { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";

const reciters = [
	{
		id: "1",
		name: "Mishary Rashid Alafasy",
		country: "Kuwait",
		photo: require("@/assets/images/logo.png"),
	},
	{
		id: "2",
		name: "Abdul Rahman Al-Sudais",
		country: "Saudi Arabia",
		photo: require("@/assets/images/logo.png"),
	},
	{
		id: "3",
		name: "Maher Al-Muaiqly",
		country: "Saudi Arabia",
		photo: require("@/assets/images/logo.png"),
	},
	{
		id: "4",
		name: "Saad Al-Ghamdi",
		country: "Saudi Arabia",
		photo: require("@/assets/images/logo.png"),
	},
];

const repeatVerseOptions = [
	{ label: "Never", value: "never" },
	{ label: "1 time", value: "1" },
	{ label: "2 times", value: "2" },
	{ label: "3 times", value: "3" },
	{ label: "Indefinitely", value: "indefinitely" },
];

const endOfSurahOptions = [
	{ label: "Stop playing", value: "stop" },
	{ label: "Repeat the surah", value: "repeat" },
	{ label: "Play the next surah", value: "next" },
];

export function AudioSettingsTab() {
	const { currentTheme, theme } = useTheme();
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);

	const { showActionSheetWithOptions } = useActionSheet();

	const [quranReciterEnabled, setQuranReciterEnabled] = useState(true);
	const [selectedReciter, setSelectedReciter] = useState(reciters[0].id);
	const [translationReciterEnabled, setTranslationReciterEnabled] =
		useState(false);
	const [audioAutoScrollEnabled, setAudioAutoScrollEnabled] = useState(false);
	const [repeatEachVerse, setRepeatEachVerse] = useState("never");
	const [atEndOfSurah, setAtEndOfSurah] = useState("stop");

	const handleRepeatEachVerse = () => {
		const options = [...repeatVerseOptions.map((o) => o.label), "Cancel"];
		const cancelButtonIndex = options.length - 1;

		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
				title: "Repeat Each Verse",
			},
			(buttonIndex) => {
				if (buttonIndex !== cancelButtonIndex) {
					setRepeatEachVerse(repeatVerseOptions[buttonIndex].value);
				}
			},
		);
	};

	const handleAtEndOfSurah = () => {
		const options = [...endOfSurahOptions.map((o) => o.label), "Cancel"];
		const cancelButtonIndex = options.length - 1;

		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
				title: "At the End of a Surah",
			},
			(buttonIndex) => {
				if (buttonIndex !== cancelButtonIndex) {
					setAtEndOfSurah(endOfSurahOptions[buttonIndex].value);
				}
			},
		);
	};

	return (
		<View className="py-4">
			<View>
				<View className="flex-row items-center justify-between">
					<View className="flex-1">
						<Text className="text-lg font-semibold">Quran Reciter</Text>
						<Text className="text-muted-foreground">
							Choose your preferred Quran reciter.
						</Text>
					</View>
					<Switch
						checked={quranReciterEnabled}
						onCheckedChange={setQuranReciterEnabled}
						style={{
							backgroundColor: quranReciterEnabled
								? selectedTheme.primary
								: `${selectedTheme.secondary}20`,
						}}
					/>
				</View>

				{quranReciterEnabled && (
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ gap: 12, paddingTop: 16 }}
					>
						{reciters.map((reciter) => (
							<Pressable
								key={reciter.id}
								onPress={() => setSelectedReciter(reciter.id)}
								className="items-center justify-center p-3 rounded-xl"
								style={{
									width: 120,
									height: 160,
									borderWidth: selectedReciter === reciter.id ? 2 : 1,
									borderColor:
										selectedReciter === reciter.id
											? selectedTheme.primary
											: isDarkMode
												? themeColors.dark.border
												: themeColors.light.border,
									backgroundColor:
										selectedReciter === reciter.id
											? `${selectedTheme.primary}15`
											: isDarkMode
												? themeColors.dark.card
												: themeColors.light.card,
								}}
							>
								<Image
									source={reciter.photo}
									className="w-16 h-16 rounded-full mb-3"
									resizeMode="cover"
								/>
								<View className="items-center">
									<Text
										className="text-sm font-medium text-center"
										numberOfLines={1}
										ellipsizeMode="tail"
									>
										{reciter.name}
									</Text>
									<Text
										className="text-xs text-muted-foreground text-center"
										numberOfLines={1}
									>
										{reciter.country}
									</Text>
								</View>
							</Pressable>
						))}
					</ScrollView>
				)}
			</View>

			<Separator className="my-4" />

			<View>
				<View className="flex-row items-center justify-between">
					<View className="flex-1">
						<Text className="text-lg font-semibold">Translation Reciter</Text>
						<Text className="text-muted-foreground">
							Enable audio translation.
						</Text>
					</View>
					<Switch
						checked={translationReciterEnabled}
						onCheckedChange={setTranslationReciterEnabled}
						style={{
							backgroundColor: translationReciterEnabled
								? selectedTheme.primary
								: `${selectedTheme.secondary}20`,
						}}
					/>
				</View>

				{translationReciterEnabled && (
					<Button className="mt-4" onPress={() => console.log("View List")}>
						<Text>View Translation List</Text>
					</Button>
				)}
			</View>

			<Separator className="my-4" />

			<View>
				<View className="flex-row items-center justify-between">
					<View className="flex-1">
						<Text className="text-lg font-semibold">Audio Auto Scroll</Text>
						<Text className="text-muted-foreground">
							Automatically scroll to the current verse being played.
						</Text>
					</View>
					<Switch
						checked={audioAutoScrollEnabled}
						onCheckedChange={setAudioAutoScrollEnabled}
						style={{
							backgroundColor: audioAutoScrollEnabled
								? selectedTheme.primary
								: `${selectedTheme.secondary}20`,
						}}
					/>
				</View>
			</View>

			<Separator className="my-4" />

			<View>
				<View className="flex-row items-center justify-between">
					<View className="flex-1">
						<Text className="text-lg font-semibold">Repeat Each Verse</Text>
					</View>
					<Pressable
						onPress={handleRepeatEachVerse}
						className="flex-row items-center justify-between rounded-md border border-border p-2"
					>
						<Text className="text-foreground mr-2">
							{repeatVerseOptions.find((o) => o.value === repeatEachVerse)
								?.label ?? "Select Option"}
						</Text>
					</Pressable>
				</View>
			</View>

			<Separator className="my-4" />

			<View>
				<View className="flex-row items-center justify-between">
					<View className="flex-1">
						<Text className="text-lg font-semibold">At the End of a Surah</Text>
					</View>
					<Pressable
						onPress={handleAtEndOfSurah}
						className="flex-row items-center justify-between rounded-md border border-border p-2"
					>
						<Text className="text-foreground mr-2">
							{endOfSurahOptions.find((o) => o.value === atEndOfSurah)?.label ??
								"Select Option"}
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
