import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

export function ArticlesHeader() {
	const { t } = useTranslation("articles");
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
			accessibilityLabel={t("accessibility.listHeader")}
		>
			<View className="flex-row items-center px-4 h-20">
				<Pressable
					onPress={() => router.back()}
					className="p-2 -ml-2 rounded-full active:bg-accent"
					accessible
					accessibilityRole="button"
					accessibilityLabel={t("accessibility.backButton")}
				>
					<Icon as={ChevronLeft} size={24} color={selectedTheme.primary} />
				</Pressable>
				<Text className="text-xl font-bold text-foreground">
					{t("list.headerTitle")}
				</Text>
			</View>
		</View>
	);
}
