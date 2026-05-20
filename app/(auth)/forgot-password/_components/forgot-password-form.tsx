import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Form, FormField, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { useForgotPasswordForm } from "../_hooks/use-forgot-password-form";

export default function ForgotPasswordForm() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { t } = useTranslation("forgotPassword");

	const { form, onSubmit } = useForgotPasswordForm();
	return (
		<Form {...form}>
			<View className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormInput
							label={t("emailLabel")}
							placeholder={t("emailPlaceholder")}
							autoCapitalize="none"
							autoComplete="email"
							accessibilityLabel={t("accessibility.emailInputLabel")}
							accessibilityHint={t("accessibility.emailInputHint")}
							{...field}
						/>
					)}
				/>

				<Button
					onPress={form.handleSubmit(onSubmit)}
					style={{ backgroundColor: selectedTheme.primary }}
					accessible
					accessibilityRole="button"
					accessibilityLabel={t("accessibility.submitButton")}
					accessibilityHint={t("accessibility.submitButtonHint")}
				>
					<Text className="text-white">{t("submitButton")}</Text>
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
