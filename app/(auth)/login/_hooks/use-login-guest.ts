import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/utils";

export function useLoginGuest() {
	const router = useRouter();

	const loginAsGuest = async () => {
		try {
			const { error } = await authClient.signIn.anonymous();
			if (error) {
				Alert.alert(
					"Login gagal",
					error.message ?? "Tidak dapat login secara anonim.",
				);
				return;
			}
			router.replace("/home");
		} catch (e: unknown) {
			Alert.alert(
				"Login gagal",
				getErrorMessage(e) ?? "Tidak dapat login secara anonim.",
			);
		}
	};

	return { loginAsGuest };
}
