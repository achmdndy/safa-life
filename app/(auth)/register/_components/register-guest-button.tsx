import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

export default function RegisterGuestButton() {
	const { t } = useTranslation("register");
	return (
		<Button
			size={"sm"}
			variant={"ghost"}
			onPress={() => router.replace("/home")}
			className="flex flex-row items-center justify-center gap-1"
			accessible
			accessibilityRole="button"
			accessibilityLabel={t("accessibility.guestButton")}
			accessibilityHint={t("accessibility.guestButtonHint")}
		>
			<Text className="text-foreground">{t("guest")}</Text>
			<Icon as={ChevronRight} className="text-foreground" size={20} />
		</Button>
	);
}
