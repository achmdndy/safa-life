import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Form, FormField } from "@/components/form";
import { OTPInput } from "@/components/otp-input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { useTwoFAForm } from "../_hooks/use-2fa-form";

export function TwoFAForm() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { t } = useTranslation("twoFa");

	const { form, onSubmit } = useTwoFAForm();
	return (
		<Form {...form}>
			<View className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<View
							accessible
							accessibilityLabel={t("accessibility.otpInput")}
							accessibilityHint={t("accessibility.otpInputHint")}
						>
							<OTPInput
								digits={6}
								onComplete={(code) => {
									field.onChange(code);
									form.handleSubmit(onSubmit)();
								}}
							/>
						</View>
					)}
				/>

				<Button
					onPress={form.handleSubmit(onSubmit)}
					style={{ backgroundColor: selectedTheme.primary }}
					accessible
					accessibilityRole="button"
					accessibilityLabel={t("accessibility.verifyButton")}
					accessibilityHint={t("accessibility.verifyButtonHint")}
				>
					<Text className="text-white">{t("verifyButton")}</Text>
				</Button>

				<View className="flex-row justify-center items-center">
					<Link href="/(auth)/login" asChild>
						<Button
							variant="link"
							accessible
							accessibilityRole="button"
							accessibilityLabel={t("accessibility.backButton")}
							accessibilityHint={t("accessibility.backButtonHint")}
						>
							<Text style={{ color: selectedTheme.primary }}>
								{t("backToLogin")}
							</Text>
						</Button>
					</Link>
				</View>
			</View>
		</Form>
	);
}
