import { FlashList } from "@shopify/flash-list";
import { Bell, Bookmark, Forward, Heart } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

export function DailyRemainderTab() {
	const { t } = useTranslation("quran");
	const insets = useSafeAreaInsets();
	const { height } = Dimensions.get("window");
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	const reminderData = [
		{
			id: 1,
			title: "Morning Dhikr",
			time: "05:00 AM",
			description:
				"And it is He who sends down rain from heaven, and We produce thereby the vegetation of every kind",
			reference: "Al-An'am 6:99",
			verse: "وَهُوَ الَّذِي أَنزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ نَبَاتَ كُلِّ شَيْءٍ",
			image:
				"https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
		},
		{
			id: 2,
			title: "Midday Reflection",
			time: "12:30 PM",
			description:
				"And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose",
			reference: "At-Talaq 65:3",
			verse: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
			image:
				"https://images.unsplash.com/photo-1571620874594-d6df8b47f708?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzbGltfGVufDB8fDB8fHww",
		},
		{
			id: 3,
			title: "Evening Prayer",
			time: "07:00 PM",
			description:
				"And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth",
			reference: "Al-An'am 6:73",
			verse:
				"وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ ۖ وَيَوْمَ يَقُولُ كُن فَيَكُونُ ۚ قَوْلُهُ الْحَقُّ",
			image:
				"https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzbGltfGVufDB8fDB8fHww",
		},
		{
			id: 4,
			title: "Night Contemplation",
			time: "09:30 PM",
			description:
				"And whoever fears Allah - He will make for him a way out. And will provide for him from where he does not expect",
			reference: "At-Talaq 65:2-3",
			verse: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
			image:
				"https://images.unsplash.com/photo-1605976528013-638e49b6599f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
		},
		{
			id: 5,
			title: "Weekly Quran Study",
			time: "Friday 08:00 PM",
			description:
				"And We have certainly made the Quran easy for remembrance, so is there any who will remember?",
			reference: "Al-Qamar 54:17",
			verse: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ",
			image:
				"https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzbGltfGVufDB8fDB8fHwy",
		},
	];

	const allReminderData = Array.from({ length: 20 }, (_, index) => {
		if (index < reminderData.length) {
			return reminderData[index];
		}

		const images = [
			"https://images.unsplash.com/photo-1616518883324-d7f5f1ce7e99?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D",
			"https://images.unsplash.com/photo-1626079313403-7399d1aa95cf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D",
			"https://images.unsplash.com/photo-1616422840391-fa670d4b2ae7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D",
			"https://images.unsplash.com/photo-1523345863760-5b7f3472d14f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D",
			"https://images.unsplash.com/photo-1590075865003-e48277faa558?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D",
		];

		const quranQuotes = [
			{
				description:
					"And give good tidings to those who believe and do righteous deeds that they will have gardens [in Paradise] beneath which rivers flow",
				reference: "Al-Baqarah 2:25",
				verse:
					"وَبَشِّرِ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أَنَّ لَهُمْ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ",
			},
			{
				description: "And Allah is the best of planners",
				reference: "Al-Anfal 8:30",
				verse: "وَاللَّهُ خَيْرُ الْمَاكِرِينَ",
			},
			{
				description:
					"And it is Allah who sends down rain from heaven, and We produce thereby the vegetation of every kind",
				reference: "Al-An'am 6:99",
				verse: "وَهُوَ الَّذِي أَنزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ نَبَاتَ كُلِّ شَيْءٍ",
			},
			{
				description:
					"And whoever does righteous deeds, whether male or female, while being a believer - those will enter Paradise",
				reference: "An-Nisa 4:124",
				verse:
					"وَمَن يَعْمَلْ مِنَ الصَّالِحَاتِ مِن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَأُولَٰئِكَ يَدْخُلُونَ الْجَنَّةَ",
			},
			{
				description:
					"And Allah loves those who are constantly repentant and loves those who purify themselves",
				reference: "Al-Baqarah 2:222",
				verse: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ",
			},
		];

		const quote = quranQuotes[index % quranQuotes.length];

		return {
			id: index + 1,
			title: `Daily Reminder ${index + 1}`,
			time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(
				Math.random() * 60,
			)
				.toString()
				.padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`,
			description: quote.description,
			reference: quote.reference,
			verse: quote.verse,
			image: images[index % images.length],
		};
	});

	return (
		<View
			className="gap-2 mt-4"
			accessible={true}
			accessibilityLabel={t("dailyReminder.accessibility.section")}
		>
			<View className="mx-4 flex-row items-center">
				<Icon
					as={Bell}
					size={20}
					className="mr-2"
					stroke={selectedTheme.primary}
				/>
				<Text
					className="font-bold text-xl"
					accessible={true}
					accessibilityLabel={t("dailyReminder.title")}
				>
					{t("dailyReminder.title")}
				</Text>
			</View>

			<View
				style={{
					height: height - 200,
				}}
			>
				<FlashList
					data={allReminderData}
					className="px-4 pt-2"
					ItemSeparatorComponent={() => <View className="h-4" />}
					ListFooterComponent={
						<View
							style={{
								paddingBottom:
									Platform.OS === "ios"
										? insets.bottom + 70
										: insets.bottom + 60,
							}}
						/>
					}
					renderItem={({ item }) => (
						<Card
							key={item.id}
							className="border-transparent p-4"
							style={{
								shadowColor: selectedTheme.primary,
								shadowOffset: { width: 0, height: 0 },
								shadowOpacity: 0.1,
								shadowRadius: 4,
							}}
						>
							<CardContent className="p-0">
								<AspectRatio ratio={7 / 3}>
									<Image
										source={{ uri: item.image }}
										className="w-full h-full rounded-lg"
										resizeMode="cover"
									/>
								</AspectRatio>
								<View className="mt-2">
									<Text
										className="font-semibold"
										style={{ color: selectedTheme.secondary }}
									>
										{item.title}
									</Text>
									<Text
										className="text-muted-foreground text-sm"
										numberOfLines={3}
									>
										{item.description}
									</Text>
									{item.reference && (
										<Text
											className="text-xs mt-1 font-medium"
											style={{ color: selectedTheme.secondary }}
										>
											- {item.reference}
										</Text>
									)}
									{item.verse && (
										<Text
											className="text-xs mt-2 font-arabic text-right"
											style={{
												color: selectedTheme.secondary,
												fontFamily: "serif",
											}}
										>
											{item.verse}
										</Text>
									)}
									<Text
										className="text-xs mt-1 font-medium"
										style={{ color: selectedTheme.secondary }}
									>
										{item.time}
									</Text>
								</View>
								<View className="flex-row items-center justify-between mt-4">
									<View className="flex-row items-center">
										<Icon
											as={Heart}
											size={18}
											color={selectedTheme.secondary}
											className="mr-1"
										/>
										<Text className="text-muted-foreground text-sm">123</Text>
									</View>

									<View className="flex-row items-center gap-4">
										<View className="flex-row items-center">
											<Icon
												as={Bookmark}
												size={18}
												color={selectedTheme.secondary}
												className="mr-1"
											/>
											<Text className="text-muted-foreground text-sm">123</Text>
										</View>

										<View className="flex-row items-center">
											<Icon
												as={Forward}
												size={18}
												color={selectedTheme.secondary}
												className="mr-1"
											/>
											<Text className="text-muted-foreground text-sm">123</Text>
										</View>
									</View>
								</View>
							</CardContent>
						</Card>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
}
