import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export const LoginGuestButton = () => {
	const { t } = useTranslation("login");
	return (
		<Button
			size={"sm"}
			variant={"link"}
			onPress={() => router.replace("/home")}
			className="flex flex-row items-center justify-center gap-1"
			accessible
			accessibilityRole="button"
			accessibilityLabel={t("accessibility.guestButton")}
			accessibilityHint={t("accessibility.guestButtonHint")}
		>
			<Text className="text-white">{t("guest")}</Text>
			<ChevronRight size={20} color="#FFF" />
		</Button>
	);
};
