import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

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

	const onSubmit = (_values: z.infer<typeof ForgotPasswordSchema>) => {
		router.navigate("/home");
	};

	return { form, onSubmit };
}
