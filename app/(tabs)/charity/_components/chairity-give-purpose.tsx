import {
	CalendarClock,
	ChevronRight,
	Gift,
	HandHeart,
	Heart,
	Users,
} from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

const purposeItems = [
	{
		id: 1,
		title: "Sadaqah",
		icon: Heart,
	},
	{
		id: 2,
		title: "Zakat",
		icon: HandHeart,
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
		title: "Fidyah",
		icon: Heart,
	},
	{
		id: 6,
		title: "Kaffarah",
		icon: HandHeart,
	},
];

export function ChairityGivePurpose() {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="px-4 gap-4 mt-4">
			<View className="flex-row justify-between items-center">
				<View className="flex-row items-center">
					<Icon
						as={CalendarClock}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Give with Purpose</Text>
				</View>
				<Pressable className="flex-row items-center">
					<Text className="text-sm mr-1">View all</Text>
					<Icon as={ChevronRight} size={16} />
				</Pressable>
			</View>

			<View className="flex-row flex-wrap justify-between gap-3">
				{purposeItems.map((item) => (
					<Pressable
						key={item.id}
						className="w-[31%] items-center p-3 bg-card rounded-xl"
						style={{
							shadowColor: selectedTheme.primary,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 4,
						}}
					>
						<View
							className="w-12 h-12 rounded-full in-range:bg-primary items-center justify-center mb-2"
							style={{ backgroundColor: `${selectedTheme.secondary}20` }}
						>
							<Icon as={item.icon} size={20} stroke={selectedTheme.primary} />
						</View>
						<Text className="text-sm font-medium text-gray-800 dark:text-foreground text-center">
							{item.title}
						</Text>
					</Pressable>
				))}
			</View>
		</View>
	);
}
