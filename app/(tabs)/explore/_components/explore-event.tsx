import { CalendarClock, ChevronRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Image, Pressable, View } from "react-native";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

export function ExploreEvent() {
	const { t } = useTranslation("explore");
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	const eventsData = [
		{
			id: "1",
			title: "Quran Recitation Competition",
			date: "15 Dec 2024",
			location: "Jakarta, Indonesia",
			image:
				"https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
		},
		{
			id: "2",
			title: "Islamic Knowledge Seminar",
			date: "22 Dec 2024",
			location: "Bandung, Indonesia",
			image:
				"https://images.unsplash.com/photo-1571620874594-d6df8b47f708?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzbGltfGVufDB8fDB8fHww",
		},
		{
			id: "3",
			title: "Community Iftar Gathering",
			date: "28 Dec 2024",
			location: "Surabaya, Indonesia",
			image:
				"https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzbGltfGVufDB8fDB8fHww",
		},
		{
			id: "4",
			title: "Youth Islamic Workshop",
			date: "05 Jan 2025",
			location: "Yogyakarta, Indonesia",
			image:
				"https://images.unsplash.com/photo-1605976528013-638e49b6599f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
		},
	];

	return (
		<View
			className="px-4 gap-4 mt-8"
			accessible={true}
			accessibilityLabel={t("events.accessibilityLabel")}
		>
			<View className="flex-row justify-between items-center">
				<View className="flex-row items-center">
					<Icon
						as={CalendarClock}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">{t("events.title")}</Text>
				</View>
				<Pressable
					className="flex-row items-center"
					accessible={true}
					accessibilityRole="button"
					accessibilityLabel={t("events.viewAllAccessibilityLabel")}
					accessibilityHint={t("events.viewAllAccessibilityHint")}
				>
					<Text className="text-primary text-sm mr-1">
						{t("events.viewAll")}
					</Text>
					<Icon as={ChevronRight} size={16} className="text-primary" />
				</Pressable>
			</View>

			<View
				className="gap-2"
				accessible={true}
				accessibilityLabel={t("events.listAccessibilityLabel")}
			>
				{eventsData.map((event) => (
					<Card
						key={event.id}
						className="p-2 border-transparent"
						style={{
							shadowColor: selectedTheme.primary,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 4,
						}}
						accessible={true}
						accessibilityRole="button"
						accessibilityLabel={t("events.eventAccessibilityLabel", {
							title: event.title,
							date: event.date,
							location: event.location,
						})}
						accessibilityHint={t("events.eventAccessibilityHint", {
							title: event.title,
						})}
					>
						<CardContent className="p-0 flex-row items-center justify-between">
							<View className="flex-row gap-4 items-center">
								<View className="w-14 h-14">
									<AspectRatio ratio={1 / 1} className="size-14">
										<Image
											source={{ uri: event.image }}
											style={{ width: "100%", height: "100%", borderRadius: 8 }}
											resizeMode="cover"
											accessible={true}
											accessibilityLabel={t(
												"events.eventImageAccessibilityLabel",
												{ title: event.title },
											)}
										/>
									</AspectRatio>
								</View>
								<View>
									<Text className="text-muted-foreground text-xs">
										{event.date}
									</Text>
									<Text className="font-semibold text-base">{event.title}</Text>
									<Text className="text-muted-foreground text-xs mt-1">
										{event.location}
									</Text>
								</View>
							</View>
							<Button
								size="icon"
								variant="outline"
								className="rounded-full"
								accessible={true}
								accessibilityRole="button"
								accessibilityLabel={t("events.eventButtonAccessibilityLabel")}
								accessibilityHint={t("events.eventButtonAccessibilityHint")}
							>
								<Icon as={ChevronRight} size={16} />
							</Button>
						</CardContent>
					</Card>
				))}
			</View>
		</View>
	);
}
