import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight, Clapperboard, Play } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

export function ExploreReels() {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	const reelsData = [
		{
			id: "1",
			title: "Morning Dhikr",
			description: "Beautiful recitation of morning remembrance",
			image:
				"https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
			duration: "2:30",
		},
		{
			id: "2",
			title: "Quran Recitation",
			description: "Surah Al-Fatiha with beautiful voice",
			image:
				"https://images.unsplash.com/photo-1571620874594-d6df8b47f708?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzbGltfGVufDB8fDB8fHww",
			duration: "3:15",
		},
		{
			id: "3",
			title: "Prayer Guide",
			description: "Step by step prayer demonstration",
			image:
				"https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzbGltfGVufDB8fDB8fHww",
			duration: "4:20",
		},
		{
			id: "4",
			title: "Islamic Stories",
			description: "Prophet Yusuf's inspiring journey",
			image:
				"https://images.unsplash.com/photo-1605976528013-638e49b6599f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
			duration: "5:45",
		},
		{
			id: "5",
			title: "Dua Collection",
			description: "Daily supplications for Muslims",
			image:
				"https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzbGltfGVufDB8fDB8fHwy",
			duration: "3:00",
		},
	];

	return (
		<View className="gap-2">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Clapperboard}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Islamic Reels</Text>
				</View>
				<Pressable className="flex-row items-center">
					<Text className="text-primary text-sm mr-1">View all</Text>
					<Icon as={ChevronRight} size={16} className="text-primary" />
				</Pressable>
			</View>

			<FlashList
				data={reelsData}
				className="px-4 py-2"
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				ItemSeparatorComponent={() => <View className="w-2" />}
				ListFooterComponent={() => <View className="w-4" />}
				renderItem={({ item }) => (
					<Pressable>
						<Card
							className="border-transparent p-0 w-full"
							style={{
								width: 160,
							}}
						>
							<CardContent className="p-0">
								<AspectRatio ratio={9 / 16}>
									<Image
										source={{ uri: item.image }}
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
											{item.duration}
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
											{item.title}
										</Text>
										<Text
											className="text-white/80 text-xs"
											numberOfLines={1}
											ellipsizeMode="tail"
										>
											{item.description}
										</Text>
									</View>
								</LinearGradient>
							</CardContent>
						</Card>
					</Pressable>
				)}
			/>
		</View>
	);
}
