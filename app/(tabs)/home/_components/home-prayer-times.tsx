import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { useHomePrayerTimes } from "../_hooks/use-home-prayer-times";

export default function HomePrayerTimes() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { t } = useTranslation("home");
	const { today, nextPrayer, countdown } = useHomePrayerTimes();

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

						<View className="items-end">
							<Text
								className="text-xs text-muted-foreground"
								accessible={true}
								accessibilityRole="text"
								accessibilityLabel={t("prayerTimes.nextPrayer.text")}
							>
								{nextPrayer?.name
									? t(
											`prayerTimes.prayers.${nextPrayer.name.toLowerCase()}.name`,
										)
									: t("prayerTimes.nextPrayer.text")}
							</Text>
							<Text
								className="text-2xl font-bold text-destructive"
								accessible={true}
								accessibilityRole="text"
								accessibilityLabel={t("prayerTimes.nextPrayer.text")}
							>
								{nextPrayer?.time
									? `${String(nextPrayer.time.getHours()).padStart(2, "0")}:${String(nextPrayer.time.getMinutes()).padStart(2, "0")}`
									: "--:--"}
							</Text>
							<View
								className="mt-2 w-40 h-2 bg-muted rounded-full overflow-hidden"
								accessibilityRole="progressbar"
								accessibilityLabel={t(
									"prayerTimes.accessibility.countdownProgress",
								)}
							>
								<View
									className="h-full"
									style={{
										width: `${countdown.progressPct}%`,
										backgroundColor: selectedTheme.primary,
									}}
								/>
							</View>
							<Text className="mt-1 text-muted-foreground">
								{`${String(countdown.hours).padStart(2, "0")}:${String(countdown.minutes).padStart(2, "0")}:${String(countdown.seconds).padStart(2, "0")}`}
							</Text>
						</View>
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
							accessibilityLabel={`${t("prayerTimes.prayers.fajr.name")} ${today?.fajr ?? "--:--"}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.fajr.name")}
							</Text>
							<Text className="font-semibold">{today?.fajr ?? "--:--"}</Text>
						</View>
						<View
							className="w-1/5 items-center"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={`${t("prayerTimes.prayers.dhuhr.name")} ${today?.dhuhr ?? "--:--"}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.dhuhr.name")}
							</Text>
							<Text className="font-semibold">{today?.dhuhr ?? "--:--"}</Text>
						</View>
						<View
							className="w-1/5 items-center"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={`${t("prayerTimes.prayers.asr.name")} ${today?.asr ?? "--:--"}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.asr.name")}
							</Text>
							<Text className="font-semibold">{today?.asr ?? "--:--"}</Text>
						</View>
						<View
							className="w-1/5 items-center"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={`${t("prayerTimes.prayers.maghrib.name")} ${today?.maghrib ?? "--:--"}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.maghrib.name")}
							</Text>
							<Text className="font-semibold">{today?.maghrib ?? "--:--"}</Text>
						</View>
						<View
							className="w-1/5 items-center"
							accessible={true}
							accessibilityRole="text"
							accessibilityLabel={`${t("prayerTimes.prayers.isha.name")} ${today?.isha ?? "--:--"}`}
						>
							<Text className="text-muted-foreground">
								{t("prayerTimes.prayers.isha.name")}
							</Text>
							<Text className="font-semibold">{today?.isha ?? "--:--"}</Text>
						</View>
					</View>
				</CardContent>
			</Card>
		</View>
	);
}
