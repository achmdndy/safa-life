import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

export function HomePrayerTimes() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { t } = useTranslation("home");

	return (
		<View
			className="px-4 mt-4"
			accessible={true}
			accessibilityRole="text"
			accessibilityLabel={t("prayerTimes.accessibility.sectionLabel")}
		>
			<Text
				className="font-semibold text-lg mb-2"
				accessible={true}
				accessibilityRole="header"
				accessibilityLabel={t("prayerTimes.accessibility.titleLabel")}
			>
				{t("prayerTimes.title")}
			</Text>

			<Card
				className="p-4 border-transparent"
				style={{
					shadowColor: selectedTheme.primary,
					shadowOffset: { width: 0, height: 0 },
					shadowOpacity: 0.1,
					shadowRadius: 10,
				}}
				accessible={true}
				accessibilityRole="text"
				accessibilityLabel={t("prayerTimes.accessibility.cardLabel")}
			>
				<CardContent className="p-0">
					<View
						className="flex-row items-center justify-between"
						accessible={true}
						accessibilityRole="text"
						accessibilityLabel={t("prayerTimes.accessibility.nextPrayerLabel", {
							nextPrayer: t("prayerTimes.nextPrayer.text"),
						})}
					>
						<View>
							<Text
								className="text-lg font-semibold"
								accessible={true}
								accessibilityRole="text"
								accessibilityLabel={t("prayerTimes.nextPrayer.name")}
							>
								{t("prayerTimes.nextPrayer.name")}
							</Text>
							<Text
								className="text-muted-foreground"
								accessible={true}
								accessibilityRole="text"
								accessibilityLabel={t("prayerTimes.nextPrayer.status")}
							>
								{t("prayerTimes.nextPrayer.status")}
							</Text>
						</View>

						<Text
							className="text-2xl font-bold text-destructive"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={t("prayerTimes.nextPrayer.text")}
						>
							{t("prayerTimes.nextPrayer.time")}
						</Text>
					</View>
					<Separator className="my-4" />
					<View
						className="flex-row items-center"
						accessible={true}
						accessibilityRole="text"
						accessibilityLabel={t("prayerTimes.accessibility.prayerListLabel")}
					>
						<View
							className="w-1/5 items-center"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={`${t("prayerTimes.prayers.fajr.name")} ${t("prayerTimes.prayers.fajr.time")}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.fajr.name")}
							</Text>
							<Text className="font-semibold">
								{t("prayerTimes.prayers.fajr.time")}
							</Text>
						</View>
						<View
							className="w-1/5 items-center"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={`${t("prayerTimes.prayers.dhuhr.name")} ${t("prayerTimes.prayers.dhuhr.time")}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.dhuhr.name")}
							</Text>
							<Text className="font-semibold">
								{t("prayerTimes.prayers.dhuhr.time")}
							</Text>
						</View>
						<View
							className="w-1/5 items-center"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={`${t("prayerTimes.prayers.asr.name")} ${t("prayerTimes.prayers.asr.time")}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.asr.name")}
							</Text>
							<Text className="font-semibold">
								{t("prayerTimes.prayers.asr.time")}
							</Text>
						</View>
						<View
							className="w-1/5 items-center"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={`${t("prayerTimes.prayers.maghrib.name")} ${t("prayerTimes.prayers.maghrib.time")}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.maghrib.name")}
							</Text>
							<Text className="font-semibold">
								{t("prayerTimes.prayers.maghrib.time")}
							</Text>
						</View>
						<View
							className="w-1/5 items-center"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={`${t("prayerTimes.prayers.isha.name")} ${t("prayerTimes.prayers.isha.time")}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.isha.name")}
							</Text>
							<Text className="font-semibold">
								{t("prayerTimes.prayers.isha.time")}
							</Text>
						</View>
					</View>
				</CardContent>
			</Card>
		</View>
	);
}
