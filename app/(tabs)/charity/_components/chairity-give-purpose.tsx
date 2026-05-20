import {
	CalendarClock,
	ChevronRight,
	Gift,
	HandHeart,
	Heart,
	Users,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

const purposeItems = [
	{
		id: 1,
		key: "sadaqah",
		title: "Sadaqah",
		icon: Heart,
	},
	{
		id: 2,
		key: "zakat",
		title: "Zakat",
		icon: HandHeart,
	},
	{
		id: 3,
		key: "infaq",
		title: "Infaq",
		icon: Gift,
	},
	{
		id: 4,
		key: "wakaf",
		title: "Wakaf",
		icon: Users,
	},
	{
		id: 5,
		key: "fidyah",
		title: "Fidyah",
		icon: Heart,
	},
	{
		id: 6,
		key: "kaffarah",
		title: "Kaffarah",
		icon: HandHeart,
	},
];

export default function ChairityGivePurpose() {
	const { t } = useTranslation("charity");
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View
			className="px-4 gap-4 mt-4"
			accessible={true}
			accessibilityLabel={t("givePurpose.accessibilityLabel")}
		>
			<View className="flex-row justify-between items-center">
				<View className="flex-row items-center">
					<Icon
						as={CalendarClock}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">{t("givePurpose.title")}</Text>
				</View>
				<Pressable
					className="flex-row items-center"
					accessible={true}
					accessibilityRole="button"
					accessibilityLabel={t("givePurpose.viewAllAccessibilityLabel")}
					accessibilityHint={t("givePurpose.viewAllAccessibilityHint")}
				>
					<Text
						className="text-sm mr-1"
						style={{ color: selectedTheme.primary }}
					>
						{t("givePurpose.viewAll")}
					</Text>
					<Icon as={ChevronRight} size={16} stroke={selectedTheme.primary} />
				</Pressable>
			</View>

			<View className="flex-row flex-wrap gap-3">
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
						accessible={true}
						accessibilityRole="button"
						accessibilityLabel={t("givePurpose.itemAccessibilityLabel", {
							item: t(`givePurpose.items.${item.key}`),
						})}
						accessibilityHint={t("givePurpose.itemAccessibilityHint", {
							item: t(`givePurpose.items.${item.key}`),
						})}
					>
						<View
							className="w-12 h-12 rounded-full in-range:bg-primary items-center justify-center mb-2"
							style={{ backgroundColor: `${selectedTheme.secondary}20` }}
						>
							<Icon as={item.icon} size={20} stroke={selectedTheme.primary} />
						</View>
						<Text className="text-sm font-medium text-gray-800 dark:text-foreground text-center">
							{t(`givePurpose.items.${item.key}`)}
						</Text>
					</Pressable>
				))}
			</View>
		</View>
	);
}
