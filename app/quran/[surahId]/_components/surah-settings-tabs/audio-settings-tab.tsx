import { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { useAudioList } from "@/app/quran/[surahId]/_hooks/use-audio-list";
import { useAudioPreferences } from "@/app/quran/[surahId]/_hooks/use-audio-preferences";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";

// Fallback image for reciter card
const fallbackPhoto = require("@/assets/images/logo.png");

// Options and labels handled by useAudioPreferences

export default function AudioSettingsTab() {
	const { currentTheme, theme } = useTheme();
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);

	// Action sheets handled via useAudioPreferences

	const [quranReciterEnabled, setQuranReciterEnabled] = useState(true);
	const {
		reciters,
		isLoading: isLoadingReciters,
		selectedReciterId,
		selectReciter,
	} = useAudioList();
	const [translationReciterEnabled, setTranslationReciterEnabled] =
		useState(false);
	const [audioAutoScrollEnabled, setAudioAutoScrollEnabled] = useState(false);
	const {
		repeatEachVerseLabel,
		atEndOfSurahLabel,
		handleRepeatEachVerse,
		handleAtEndOfSurah,
	} = useAudioPreferences();

	// handlers provided by useAudioPreferences

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
						{isLoadingReciters
							? Array.from({ length: 4 }).map((_, i) => (
									<View
										key={`reciter-skel-${i.toString()}`}
										className="items-center justify-center p-3 rounded-xl"
										style={{
											width: 120,
											height: 160,
											borderWidth: 1,
											borderColor: isDarkMode
												? themeColors.dark.border
												: themeColors.light.border,
											backgroundColor: isDarkMode
												? themeColors.dark.card
												: themeColors.light.card,
										}}
									>
										<Skeleton className="w-16 h-16 rounded-full mb-3" />
										<Skeleton className="w-20 h-4 rounded mb-2" />
										<Skeleton className="w-14 h-3 rounded" />
									</View>
								))
							: reciters.map((reciter) => {
									const selected = selectedReciterId === reciter.id;
									return (
										<Pressable
											key={reciter.id}
											onPress={() => selectReciter(reciter.id)}
											className="items-center justify-center p-3 rounded-xl"
											style={{
												width: 120,
												height: 160,
												borderWidth: selected ? 2 : 1,
												borderColor: selected
													? selectedTheme.primary
													: isDarkMode
														? themeColors.dark.border
														: themeColors.light.border,
												backgroundColor: selected
													? `${selectedTheme.primary}15`
													: isDarkMode
														? themeColors.dark.card
														: themeColors.light.card,
											}}
										>
											<Image
												source={fallbackPhoto}
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
												{!!reciter.style && (
													<Text
														className="text-xs text-muted-foreground text-center"
														numberOfLines={1}
													>
														{reciter.style}
													</Text>
												)}
											</View>
										</Pressable>
									);
								})}
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
						<Text className="text-foreground mr-2">{repeatEachVerseLabel}</Text>
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
						<Text className="text-foreground mr-2">{atEndOfSurahLabel}</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
