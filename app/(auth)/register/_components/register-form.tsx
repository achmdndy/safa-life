import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Form, FormField, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { useRegisterForm } from "../_hooks/use-register-form";

export function RegisterForm() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { t } = useTranslation("register");

	const { form, onSubmit } = useRegisterForm();
	return (
		<Form {...form}>
			<View className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormInput
							label={t("nameLabel")}
							placeholder={t("namePlaceholder")}
							autoCapitalize="words"
							autoComplete="name"
							accessibilityLabel={t("accessibility.nameInputLabel")}
							accessibilityHint={t("accessibility.nameInputHint")}
							{...field}
						/>
					)}
				/>
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
							autoComplete="password-new"
							secureTextEntry
							accessibilityLabel={t("accessibility.passwordInputLabel")}
							accessibilityHint={t("accessibility.passwordInputHint")}
							{...field}
						/>
					)}
				/>

				<Button
					onPress={form.handleSubmit(onSubmit)}
					style={{ backgroundColor: selectedTheme.primary }}
					accessible
					accessibilityRole="button"
					accessibilityLabel={t("accessibility.registerButton")}
					accessibilityHint={t("accessibility.registerButtonHint")}
				>
					<Text className="text-white">{t("registerButton")}</Text>
				</Button>

				<View className="flex-row justify-center items-center">
					<Text>{t("loginPrompt")}</Text>
					<Link href="/(auth)/login" asChild>
						<Button
							variant="link"
							accessible
							accessibilityRole="button"
							accessibilityLabel={t("accessibility.loginButton")}
							accessibilityHint={t("accessibility.loginButtonHint")}
						>
							<Text style={{ color: selectedTheme.primary }}>
								{t("loginButton")}
							</Text>
						</Button>
					</Link>
				</View>
			</View>
		</Form>
	);
}
