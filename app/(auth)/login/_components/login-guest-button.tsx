import { ChevronRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useLoginGuest } from "../_hooks/use-login-guest";

export const LoginGuestButton = () => {
	const { t } = useTranslation("login");
	const { loginAsGuest } = useLoginGuest();
	return (
		<Button
			size={"sm"}
			variant={"link"}
			onPress={loginAsGuest}
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
