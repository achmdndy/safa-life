import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { Flame, Play } from "lucide-react-native";
import { Image, View } from "react-native";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

const hotReels = [
	{
		id: 1,
		title: "Beautiful Quran Recitation",
		creator: "Sheikh Ahmad",
		views: "25.3K",
		duration: "3:45",
		image:
			"https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
		description: "Beautiful recitation with melodious voice",
	},
	{
		id: 2,
		title: "Daily Dhikr Reminder",
		creator: "Islamic Moments",
		views: "18.7K",
		duration: "1:30",
		image:
			"https://images.unsplash.com/photo-1571620874594-d6df8b47f708?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzbGltfGVufDB8fDB8fHww",
		description: "Morning and evening dhikr collection",
	},
	{
		id: 3,
		title: "Surah Al-Mulk Recitation",
		creator: "Quran Academy",
		views: "32.1K",
		duration: "5:20",
		image:
			"https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzbGltfGVufDB8fDB8fHww",
		description: "Complete recitation of Surah Al-Mulk",
	},
	{
		id: 4,
		title: "Morning Dua Collection",
		creator: "Daily Islam",
		views: "14.9K",
		duration: "2:15",
		image:
			"https://images.unsplash.com/photo-1605976528013-638e49b6599f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
		description: "Essential morning duas for Muslims",
	},
	{
		id: 5,
		title: "99 Names of Allah",
		creator: "Islamic Learning",
		views: "28.5K",
		duration: "4:10",
		image:
			"https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
		description: "Learn the beautiful names of Allah",
	},
];

export default function ExploreReels() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-4 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Play}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Hot Reels</Text>
				</View>
				<View className="flex-row items-center">
					<Icon as={Flame} size={16} className="mr-1" stroke="#ff6b35" />
					<Text className="text-sm text-orange-500">Popular</Text>
				</View>
			</View>

			<FlashList
				data={hotReels}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 16 }}
				ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
				renderItem={({ item: reel }) => (
					<Card
						className="border-transparent p-0 w-full"
						style={{
							width: 160,
						}}
					>
						<CardContent className="p-0">
							<AspectRatio ratio={9 / 16}>
								<Image
									source={{ uri: reel.image }}
									style={{ width: "100%", height: "100%", borderRadius: 12 }}
									resizeMode="cover"
								/>
								<View className="absolute inset-0 items-center justify-center">
									<View className="bg-primary/20 w-12 h-12 rounded-full items-center justify-center">
										<Icon as={Play} size={24} className="text-white ml-1" />
									</View>
								</View>
								<View className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded">
									<Text className="text-white text-xs font-medium">
										{reel.duration}
									</Text>
								</View>
							</AspectRatio>
							<LinearGradient
								colors={["transparent", "rgba(0,0,0,0.7)"]}
								style={{
									position: "absolute",
									left: 0,
									right: 0,
									bottom: 0,
									height: 80,
									borderBottomLeftRadius: 12,
									borderBottomRightRadius: 12,
								}}
							>
								<View className="absolute bottom-3 left-3 right-3">
									<Text className="font-semibold text-base text-white">
										{reel.title}
									</Text>
									<Text
										className="text-white/80 text-xs"
										numberOfLines={1}
										ellipsizeMode="tail"
									>
										{reel.description}
									</Text>
								</View>
							</LinearGradient>
						</CardContent>
					</Card>
				)}
			/>
		</View>
	);
}
