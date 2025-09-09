import { FlashList } from "@shopify/flash-list";
import { Sparkles } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

const suggests = [
	"Daily Du'as",
	"Qibla Finder",
	"Halal Scanner",
	"Islamic Library",
	"Community Forum",
	"Goal Tracker",
	"Mosque Finder",
	"Zakat Calculator",
	"Live Kaba Stream",
	"Halal Recipes",
	"Daily Quiz",
	"Prayer Reminders",
	"Sadaqah Feature",
	"Events Calendar",
	"Hijab Tutorials",
];

export function HomeSuggested() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-2">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Sparkles}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Suggested</Text>
				</View>
			</View>

			<FlashList
				data={suggests}
				className="px-4 py-2"
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				ItemSeparatorComponent={() => <View className="w-2" />}
				ListFooterComponent={() => <View className="w-4" />}
				renderItem={({ item }) => (
					<Pressable>
						<Badge
							className="h-10 px-4 rounded-full"
							style={{ backgroundColor: selectedTheme.primary }}
						>
							<Text>{item}</Text>
						</Badge>
					</Pressable>
				)}
			/>
		</View>
	);
}
