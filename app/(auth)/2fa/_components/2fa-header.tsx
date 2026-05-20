import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function TwoFAHeader() {
	const { t } = useTranslation("twoFa");

	return (
		<View className="flex items-center justify-center pt-4 px-6">
			<Text
				variant="h3"
				className="text-center mb-2 mt-4"
				accessible
				accessibilityRole="header"
				accessibilityLabel={t("accessibility.title")}
			>
				{t("title")}
			</Text>
			<Text
				variant="muted"
				className="text-center mb-8"
				accessible
				accessibilityLabel={t("accessibility.subtitle")}
			>
				{t("subtitle")}
			</Text>
		</View>
	);
}
