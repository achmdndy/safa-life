import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

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

	const onSubmit = (_values: z.infer<typeof RegisterSchema>) => {
		router.navigate("/verify-email");
	};

	return { form, onSubmit };
}
