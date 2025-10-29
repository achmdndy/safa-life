import { BellRing } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

export function NotificationEmptyState() {
	const { t } = useTranslation("notifications");

	return (
		<View
			className="flex-1 items-center justify-center pt-32"
			accessible
			accessibilityLabel={t("accessibility.emptyStateTitle")}
		>
			<Icon as={BellRing} size={64} className="text-muted-foreground/50" />
			<Text
				className="text-xl font-bold text-foreground mt-6"
				accessibilityRole="header"
			>
				{t("emptyState.title")}
			</Text>
			<Text className="text-base text-muted-foreground mt-2 text-center px-8">
				{t("emptyState.message")}
			</Text>
		</View>
	);
}
