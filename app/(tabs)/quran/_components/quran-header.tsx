import { useRouter } from "expo-router";
import { Headphones, Search } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

export default function QuranHeader() {
	const insets = useSafeAreaInsets();
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];
	const router = useRouter();
	const { t } = useTranslation("quran");

	return (
		<View
			className="px-4 flex-row items-center justify-between gap-4"
			style={{
				paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 20,
			}}
			accessible={true}
			accessibilityRole="header"
			accessibilityLabel={t("accessibility.screenLabel")}
		>
			<Button
				className="rounded-full justify-start w-full flex-1"
				variant="outline"
				onPress={() => router.push("/search/quran")}
				accessible={true}
				accessibilityRole="button"
				accessibilityLabel={t("header.accessibility.searchButton")}
			>
				<Icon as={Search} size={20} stroke={selectedTheme.primary} />
				<Text className="text-muted-foreground">
					{t("header.searchPlaceholder")}
				</Text>
			</Button>
			<Button
				size="icon"
				variant="outline"
				className="rounded-full"
				accessible={true}
				accessibilityRole="button"
				accessibilityLabel={t("header.accessibility.audioButton")}
			>
				<Icon as={Headphones} size={20} stroke={selectedTheme.primary} />
			</Button>
		</View>
	);
}
