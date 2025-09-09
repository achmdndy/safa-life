import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

export function LanguageHeader() {
	const insets = useSafeAreaInsets();
	const { t } = useTranslation("language");
	const router = useRouter();

	return (
		<View style={{ paddingTop: insets.top }} className="px-4 bg-background">
			<View className="flex-row items-center justify-between">
				<Button onPress={() => router.back()} variant="ghost" size="icon">
					<Icon as={ChevronLeft} size={20} className="text-foreground" />
				</Button>

				<View className="flex-1 flex-row items-center justify-center">
					<Text className="text-xl font-bold text-foreground">
						{t("title", { defaultValue: "Pengaturan Bahasa" })}
					</Text>
				</View>

				<View className="w-10" />
			</View>
		</View>
	);
}
