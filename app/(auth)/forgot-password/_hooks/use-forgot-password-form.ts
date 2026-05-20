import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/utils";

export function useForgotPasswordForm() {
	const router = useRouter();
	const { t } = useTranslation("forgotPassword");

	const ForgotPasswordSchema = z.object({
		email: z.string().email({
			message: t("emailRequired"),
		}),
	});

	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
		try {
			const { error } = await authClient.requestPasswordReset({
				email: values.email,
				redirectTo: "/reset-password", // deep link; adjust when you add screen
			});

			if (error) {
				Alert.alert(
					t("forgotPasswordErrorTitle", { defaultValue: "Reset failed" }),
					error.message ??
						t("forgotPasswordErrorMessage", {
							defaultValue: "Unable to send reset link.",
						}),
				);
				return;
			}

			Alert.alert(
				t("forgotPasswordSuccessTitle", { defaultValue: "Email sent" }),
				t("forgotPasswordSuccessMessage", {
					defaultValue: "Check your email for the reset link.",
				}),
			);
			router.navigate("/home");
		} catch (e: unknown) {
			Alert.alert(
				t("forgotPasswordErrorTitle", { defaultValue: "Reset failed" }),
				getErrorMessage(e) ??
					t("forgotPasswordErrorMessage", {
						defaultValue: "Unable to send reset link.",
					}),
			);
		}
	};

	return { form, onSubmit };
}
