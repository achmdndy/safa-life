import { MailCheck } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { useVerifyEmail } from "./_hooks/use-verify-email";

export default function VerifyEmailScreen() {
	const insets = useSafeAreaInsets();
	const { t } = useTranslation("verifyEmail");
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { resend, skip } = useVerifyEmail();

	return (
		<View
			className="bg-background flex-1 justify-center"
			style={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 24 }}
			accessible
			accessibilityLabel={t("accessibility.screen")}
		>
			<View className="items-center">
				<View
					className="w-24 h-24 rounded-full items-center justify-center"
					accessible
					accessibilityLabel={t("accessibility.icon")}
					style={{ backgroundColor: selectedTheme.secondary }}
				>
					<MailCheck size={48} color={"#FFF"} />
				</View>
				<Text
					variant="h3"
					className="text-center mb-2 mt-6"
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

			<View className="flex flex-col gap-4">
				<View className="flex-row justify-center items-center">
					<Text>{t("didNotReceive")}</Text>
					<Button
						variant="link"
						accessible
						accessibilityRole="button"
						accessibilityLabel={t("accessibility.resendButton")}
						accessibilityHint={t("accessibility.resendButtonHint")}
						onPress={resend}
					>
						<Text style={{ color: selectedTheme.primary }}>
							{t("resendButton")}
						</Text>
					</Button>
				</View>

				<Button
					onPress={skip}
					accessible
					accessibilityRole="button"
					accessibilityLabel={t("accessibility.skipButton")}
					accessibilityHint={t("accessibility.skipButtonHint")}
					style={{ backgroundColor: selectedTheme.primary }}
				>
					<Text className="text-white">{t("skipButton")}</Text>
				</Button>
			</View>
		</View>
	);
}
