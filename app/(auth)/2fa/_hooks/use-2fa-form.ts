import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

export function useTwoFAForm() {
	const router = useRouter();
	const { t } = useTranslation("2fa");

	const TwoFASchema = z.object({
		code: z.string().min(6, {
			message: t("codeRequired"),
		}),
	});

	const form = useForm<z.infer<typeof TwoFASchema>>({
		resolver: zodResolver(TwoFASchema),
		defaultValues: {
			code: "",
		},
	});

	const onSubmit = (_values: z.infer<typeof TwoFASchema>) => {
		router.navigate("/home");
	};

	return { form, onSubmit };
}
