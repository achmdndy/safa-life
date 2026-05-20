import { Bell, DollarSign, Newspaper, Users } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

interface NotificationItemProps {
	item: {
		id: string;
		type: "payment" | "community" | "reminder" | "article";
		title: string;
		description: string;
		time: string;
		read: boolean;
	};
	onPress: () => void;
}

const iconMap = {
	payment: DollarSign,
	community: Users,
	reminder: Bell,
	article: Newspaper,
};

export default function NotificationItem({
	item,
	onPress,
}: NotificationItemProps) {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const IconComponent = iconMap[item.type];

	return (
		<Pressable onPress={onPress} className="active:bg-accent">
			<View
				className="flex-row items-center p-4 border-b border-border"
				style={{
					borderLeftWidth: item.read ? 0 : 4,
					borderLeftColor: item.read ? "transparent" : selectedTheme.primary,
				}}
			>
				<View className="w-10 h-10 rounded-full items-center justify-center mx-2">
					<Icon as={IconComponent} size={24} color={selectedTheme.primary} />
				</View>
				<View className="flex-1">
					<Text className="text-base font-semibold text-foreground">
						{item.title}
					</Text>
					<Text className="text-sm text-muted-foreground mt-1">
						{item.description}
					</Text>
					<Text className="text-xs text-muted-foreground mt-2">
						{item.time}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}
