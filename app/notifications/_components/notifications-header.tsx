import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

interface NotificationsHeaderProps {
	onMarkAllAsRead: () => void;
}

export function NotificationsHeader({
	onMarkAllAsRead,
}: NotificationsHeaderProps) {
	const { t } = useTranslation("notifications");
	const insets = useSafeAreaInsets();
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View
			className="bg-card"
			style={{
				paddingTop: insets.top,
			}}
			accessible
			accessibilityRole="header"
			accessibilityLabel={t("accessibility.header")}
		>
			<View className="flex-row items-center justify-between px-4 h-20">
				<View className="flex flex-row items-center gap-2">
					<Pressable
						onPress={() => router.back()}
						className="p-2 -ml-2 rounded-full active:bg-accent"
						accessible
						accessibilityRole="button"
						accessibilityLabel={t("accessibility.backButton")}
					>
						<Icon as={ArrowLeft} size={24} color={selectedTheme.primary} />
					</Pressable>
					<View className="items-center justify-center">
						<Text className="text-xl font-bold text-foreground">
							{t("header.title")}
						</Text>
					</View>
				</View>
				<Button variant="link" className="p-0" onPress={onMarkAllAsRead}>
					<Text className="text-primary text-base">
						{t("header.markAllAsRead")}
					</Text>
				</Button>
			</View>
		</View>
	);
}
