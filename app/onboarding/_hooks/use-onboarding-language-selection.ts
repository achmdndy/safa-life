import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { type Language, useLanguage } from "@/contexts/language-context";

interface LanguageOption {
	code: Language;
	name: string;
	nativeName: string;
	flag: string;
}

export function useOnboardingLanguageSelection() {
	const { currentLanguage, setLanguage, isLoading } = useLanguage();
	const { t } = useTranslation("language");
	const [isChanging, setIsChanging] = useState(false);

	const languageOptions: LanguageOption[] = [
		{
			code: "id",
			name: t("indonesian", { defaultValue: "Indonesian" }),
			nativeName: "Bahasa Indonesia",
			flag: "🇮🇩",
		},
		{
			code: "en",
			name: t("english", { defaultValue: "English" }),
			nativeName: "English",
			flag: "🇺🇸",
		},
		{
			code: "ar",
			name: t("arabic", { defaultValue: "Arabic" }),
			nativeName: "العربية",
			flag: "🇸🇦",
		},
		{
			code: "ms",
			name: t("malay", { defaultValue: "Malay" }),
			nativeName: "Bahasa Melayu",
			flag: "🇲🇾",
		},
	];

	const handleLanguageChange = async (language: Language) => {
		if (language === currentLanguage || isChanging || isLoading) return;

		setIsChanging(true);
		try {
			await setLanguage(language);

			// Show restart alert for RTL changes
			if (language === "ar" || currentLanguage === "ar") {
				Alert.alert(
					t("title", { defaultValue: "Language Settings" }),
					t("restart", {
						defaultValue: "App will restart to apply language changes",
					}),
					[{ text: "OK" }],
				);
			}
		} catch (error) {
			console.error("Error changing language:", error);
			Alert.alert("Error", "Failed to change language. Please try again.", [
				{ text: "OK" },
			]);
		} finally {
			setIsChanging(false);
		}
	};

	// Handler for Select component that expects { value: string; label: string }
	const handleSelectChange = (option: { value: string; label: string }) => {
		handleLanguageChange(option.value as Language);
	};

	// Convert current language to Select component's expected format
	const currentLanguageOption = languageOptions.find(
		(lang) => lang.code === currentLanguage,
	);
	const selectValue = currentLanguageOption
		? {
				value: currentLanguageOption.code,
				label: `${currentLanguageOption.flag} ${currentLanguageOption.nativeName}`,
			}
		: undefined;

	return {
		currentLanguage,
		languageOptions,
		isChanging: isChanging || isLoading,
		handleLanguageChange: handleSelectChange,
		selectValue,
	};
}
