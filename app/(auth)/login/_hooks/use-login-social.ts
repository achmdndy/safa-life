import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/utils";

export function useLoginSocial() {
	const router = useRouter();

	const loginWithGoogle = async () => {
		try {
			const { error } = await authClient.signIn.social({
				provider: "google",
				callbackURL: "/home",
			});

			if (error) {
				Alert.alert(
					"Login failed",
					error.message ?? "Unable to login with Google.",
				);
				return;
			}

			try {
				await AsyncStorage.removeItem("guest_session");
			} catch {}

			router.replace("/home");
		} catch (e: unknown) {
			Alert.alert(
				"Login failed",
				getErrorMessage(e) ?? "Unable to login with Google.",
			);
		}
	};

	return { loginWithGoogle };
}
