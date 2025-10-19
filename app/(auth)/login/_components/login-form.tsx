import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Form, FormField, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { useLoginForm } from "../_hooks/use-login-form";

export function LoginForm() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { t } = useTranslation("login");

	const { form, onSubmit } = useLoginForm();
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
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormInput
							label={t("passwordLabel")}
							placeholder={t("passwordPlaceholder")}
							autoCapitalize="none"
							autoComplete="password"
							secureTextEntry
							accessibilityLabel={t("accessibility.passwordInputLabel")}
							accessibilityHint={t("accessibility.passwordInputHint")}
							{...field}
						/>
					)}
				/>

				<View className="flex-row justify-end">
					<Link href="/(auth)/forgot-password" asChild>
						<Button
							variant="link"
							size="sm"
							className="px-0"
							accessible
							accessibilityRole="button"
							accessibilityLabel={t("accessibility.forgotPasswordButton")}
							accessibilityHint={t("accessibility.forgotPasswordButtonHint")}
						>
							<Text style={{ color: selectedTheme.primary }}>
								{t("forgotPassword")}
							</Text>
						</Button>
					</Link>
				</View>

				<Button
					onPress={form.handleSubmit(onSubmit)}
					style={{ backgroundColor: selectedTheme.primary }}
					accessible
					accessibilityRole="button"
					accessibilityLabel={t("accessibility.continueButton")}
					accessibilityHint={t("accessibility.continueButtonHint")}
				>
					<Text className="text-white">{t("continueButton")}</Text>
				</Button>

				<View className="flex-row justify-center items-center">
					<Text>{t("dontHaveAccount")}</Text>
					<Link href="/register" asChild>
						<Button
							variant="link"
							accessible
							accessibilityRole="button"
							accessibilityLabel={t("accessibility.registerButton")}
							accessibilityHint={t("accessibility.registerButtonHint")}
						>
							<Text style={{ color: selectedTheme.primary }}>
								{t("register")}
							</Text>
						</Button>
					</Link>
				</View>
			</View>
		</Form>
	);
}
