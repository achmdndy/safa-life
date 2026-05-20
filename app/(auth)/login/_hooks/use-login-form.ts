import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/utils";

export function useLoginForm() {
	const router = useRouter();
	const { t } = useTranslation("login");

	const LoginSchema = z.object({
		email: z.string().min(1, {
			message: t("emailRequired"),
		}),
		password: z.string().min(1, {
			message: t("passwordRequired"),
		}),
	});

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		const { email, password } = values;
		try {
			const { error } = await authClient.signIn.email({
				email,
				password,
				callbackURL: "/home",
			});

			if (error) {
				// Handle unverified email explicitly
				if (error.status === 403) {
					Alert.alert(
						t("emailNotVerifiedTitle", { defaultValue: "Email not verified" }),
						t("emailNotVerifiedMessage", {
							defaultValue: "Please verify your email before logging in.",
						}),
					);
					return;
				}
				Alert.alert(
					t("loginErrorTitle", { defaultValue: "Login failed" }),
					error.message ??
						t("loginErrorMessage", {
							defaultValue: "Unable to login. Please try again.",
						}),
				);
				return;
			}

			// Clear guest session flag on successful login
			try {
				await AsyncStorage.removeItem("guest_session");
			} catch {}

			router.replace("/home");
		} catch (e: unknown) {
			Alert.alert(
				t("loginErrorTitle", { defaultValue: "Login failed" }),
				getErrorMessage(e) ??
					t("loginErrorMessage", {
						defaultValue: "Unable to login. Please try again.",
					}),
			);
		}
	};

	return { form, onSubmit };
}
