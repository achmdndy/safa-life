import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/utils";

export function useRegisterForm() {
	const router = useRouter();
	const { t } = useTranslation("register");

	const RegisterSchema = z.object({
		name: z.string().min(1, {
			message: t("nameRequired"),
		}),
		email: z.string().email({
			message: t("emailRequired"),
		}),
		password: z.string().min(6, {
			message: t("passwordMinLength"),
		}),
	});

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
		const { name, email, password } = values;
		try {
			const callbackURL = `/verify-email?email=${encodeURIComponent(email)}`;
			const { error } = await authClient.signUp.email({
				name,
				email,
				password,
				callbackURL,
			});

			if (error) {
				Alert.alert(
					t("registerErrorTitle", { defaultValue: "Registration failed" }),
					error.message ??
						t("registerErrorMessage", {
							defaultValue: "Unable to register. Please try again.",
						}),
				);
				return;
			}

			router.replace(callbackURL);
		} catch (e: unknown) {
			Alert.alert(
				t("registerErrorTitle", { defaultValue: "Registration failed" }),
				getErrorMessage(e) ??
					t("registerErrorMessage", {
						defaultValue: "Unable to register. Please try again.",
					}),
			);
		}
	};

	return { form, onSubmit };
}
