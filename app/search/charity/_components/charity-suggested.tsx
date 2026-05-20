import { FlashList } from "@shopify/flash-list";
import {
	Gift,
	HandHeart,
	Heart,
	Search,
	Users,
	Zap,
} from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

const suggestedItems = [
	{
		id: 1,
		title: "Zakat",
		icon: HandHeart,
	},
	{
		id: 2,
		title: "Sadaqah",
		icon: Heart,
	},
	{
		id: 3,
		title: "Infaq",
		icon: Gift,
	},
	{
		id: 4,
		title: "Wakaf",
		icon: Users,
	},
	{
		id: 5,
		title: "Emergency",
		icon: Zap,
	},
];

export default function CharitySuggested() {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Search}
						size={18}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Quick Search</Text>
				</View>
			</View>

			<FlashList
				data={suggestedItems}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 16 }}
				renderItem={({ item }) => (
					<Pressable className="mr-3">
						<Badge
							className="h-10 px-4 rounded-full flex-row items-center"
							variant="outline"
						>
							<Icon as={item.icon} size={16} />
							<Text className="text-sm font-medium ml-2">{item.title}</Text>
						</Badge>
					</Pressable>
				)}
			/>
		</View>
	);
}
