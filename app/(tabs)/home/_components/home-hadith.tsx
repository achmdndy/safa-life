import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

export function HomeHadith() {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { t } = useTranslation("home");

	return (
		<View
			className="px-4 mt-4"
			accessible={true}
			accessibilityRole="text"
			accessibilityLabel={t("hadith.accessibility.sectionLabel")}
		>
			<Text
				className="font-semibold text-lg mb-2"
				accessible={true}
				accessibilityRole="header"
				accessibilityLabel={t("hadith.accessibility.titleLabel")}
			>
				{t("hadith.title")}
			</Text>

			<Card
				className="p-0 overflow-hidden"
				accessible={true}
				accessibilityRole="text"
				accessibilityLabel={t("hadith.accessibility.cardLabel")}
			>
				<LinearGradient
					colors={[selectedTheme.primary, selectedTheme.secondary]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={{
						padding: 16,
						gap: 8,
					}}
				>
					<CardContent
						className="p-0"
						accessible={true}
						accessibilityRole="text"
						accessibilityLabel={t("hadith.accessibility.contentLabel")}
					>
						<Text className="text-white">{t("hadith.content")}</Text>
					</CardContent>
					<CardFooter
						className="p-0 items-center justify-end"
						accessible={true}
						accessibilityRole="text"
						accessibilityLabel={t("hadith.accessibility.sourceLabel")}
					>
						<Text className="text-white">{t("hadith.source")}</Text>
					</CardFooter>
				</LinearGradient>
			</Card>
		</View>
	);
}
