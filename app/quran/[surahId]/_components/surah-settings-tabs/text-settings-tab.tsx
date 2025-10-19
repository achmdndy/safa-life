import { useState } from "react";
import { Pressable, View } from "react-native";
import { Slider } from "@/components/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

export function TextSettingsTab() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const [fontSize, setFontSize] = useState(16);
	const [tajweedEnabled, setTajweedEnabled] = useState(false);
	const [translationEnabled, setTranslationEnabled] = useState(true);
	const [transliterationEnabled, setTransliterationEnabled] = useState(false);
	const [selectedTranslationLanguage] = useState("English");
	const [selectedTransliterationLanguage] = useState("English");

	return (
		<View className="py-4">
			<View className="flex-row items-center justify-between">
				<View className="flex-1">
					<Text className="text-lg font-semibold">Tajweed Colours Guide</Text>
					<Text className="text-muted-foreground mb-2">
						Highlight letters based on Tajweed rules.
					</Text>
					<Pressable
						onPress={() => console.log("What is Tajweed?")}
						className="self-start rounded-md py-1"
					>
						<Text className="text-sm text-primary">What is Tajweed?</Text>
					</Pressable>
				</View>
				<Switch
					checked={tajweedEnabled}
					onCheckedChange={setTajweedEnabled}
					style={{
						backgroundColor: tajweedEnabled
							? selectedTheme.primary
							: `${selectedTheme.secondary}20`,
					}}
				/>
			</View>
			<Separator className="my-4" />
			<View className="flex-row items-center justify-between">
				<View className="flex-1">
					<Text className="text-lg font-semibold">Translation</Text>
					<Text className="text-muted-foreground mb-1">
						Display the translation of the Quran.
					</Text>
					<Text className="text-sm text-foreground mb-2">
						Selected: {selectedTranslationLanguage}
					</Text>
					<Pressable
						onPress={() => console.log("View More Translations")}
						className="self-start rounded-md py-1"
					>
						<Text className="text-sm text-primary">View More Translations</Text>
					</Pressable>
				</View>
				<Switch
					checked={translationEnabled}
					onCheckedChange={setTranslationEnabled}
					style={{
						backgroundColor: translationEnabled
							? selectedTheme.primary
							: `${selectedTheme.secondary}20`,
					}}
				/>
			</View>
			<Separator className="my-4" />
			<View className="flex-row items-center justify-between">
				<View className="flex-1">
					<Text className="text-lg font-semibold">Transliteration</Text>
					<Text className="text-muted-foreground mb-1">
						Display the transliteration of the Quran.
					</Text>
					<Text className="text-sm text-foreground mb-2">
						Selected: {selectedTransliterationLanguage}
					</Text>
					<Pressable
						onPress={() => console.log("View More Transliterations")}
						className="self-start rounded-md py-1"
					>
						<Text className="text-sm text-primary">
							View More Transliterations
						</Text>
					</Pressable>
				</View>
				<Switch
					checked={transliterationEnabled}
					onCheckedChange={setTransliterationEnabled}
					style={{
						backgroundColor: transliterationEnabled
							? selectedTheme.primary
							: `${selectedTheme.secondary}20`,
					}}
				/>
			</View>
			<Separator className="my-4" />
			<Text className="text-lg font-semibold mb-2">Font Size</Text>
			<Text className="text-muted-foreground mb-4">
				Adjust the text size of the Arabic and translation.
			</Text>
			<View className="flex-row items-center justify-between">
				<Text className="text-sm text-muted-foreground">Small</Text>
				<Text className="text-sm text-muted-foreground">Large</Text>
			</View>
			<Slider
				minimumValue={12}
				maximumValue={24}
				step={1}
				value={fontSize}
				onValueChange={setFontSize}
				className="mt-2"
			/>
			<Text className="text-center text-base mt-2">
				Current Size: {fontSize}
			</Text>
		</View>
	);
}
