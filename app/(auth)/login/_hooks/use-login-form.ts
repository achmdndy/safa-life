import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

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

	const onSubmit = (_values: z.infer<typeof LoginSchema>) => {
		router.navigate("/home");
	};

	return { form, onSubmit };
}
