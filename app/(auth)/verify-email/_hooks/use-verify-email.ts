import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert } from "react-native";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/utils";

export function useVerifyEmail() {
	const router = useRouter();
	const params = useLocalSearchParams<{ email?: string }>();
	const email = typeof params.email === "string" ? params.email : undefined;

	const resend = async () => {
		try {
			if (!email) {
				Alert.alert(
					"Verification failed",
					"Email tidak tersedia untuk pengiriman ulang.",
				);
				return;
			}
			const { error } = await authClient.sendVerificationEmail({
				email,
				callbackURL: "/login",
			});
			if (error) {
				Alert.alert(
					"Verification failed",
					error.message ?? "Unable to resend verification email.",
				);
				return;
			}
			Alert.alert(
				"Email sent",
				"Please check your inbox to verify your email.",
			);
		} catch (e: unknown) {
			Alert.alert(
				"Verification failed",
				getErrorMessage(e) ?? "Unable to resend verification email.",
			);
		}
	};

	const skip = () => {
		router.replace("/home");
	};

	return { resend, skip };
}
