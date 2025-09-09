import { Check } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useLanguage } from "@/contexts/language-context";
import { useLanguageSelection } from "../_hooks/use-language-selection";

export function LanguageSelector() {
	const { isRTL } = useLanguage();
	const { t } = useTranslation("language");
	const { currentLanguage, languageOptions, isChanging, handleLanguageChange } =
		useLanguageSelection();

	return (
		<View className="p-4">
			<Text
				className={`text-base font-medium text-muted-foreground mb-4 ${isRTL ? "text-right" : "text-left"}`}
			>
				{t("select")}
			</Text>

			<View className="space-y-3">
				{languageOptions.map((option) => {
					const isSelected = option.code === currentLanguage;
					const isCurrentlyChanging = isChanging && isSelected;

					return (
						<TouchableOpacity
							key={option.code}
							onPress={() => handleLanguageChange(option.code)}
							disabled={isChanging}
							className="w-full"
						>
							<Card
								className={`p-4 ${isSelected ? "border-primary bg-primary/5" : "border-border"}`}
							>
								<View
									className={`flex-row items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
								>
									<View
										className={`flex-row items-center flex-1 ${isRTL ? "flex-row-reverse" : ""}`}
									>
										<Text className="text-2xl mr-3">{option.flag}</Text>
										<View
											className={`flex-1 ${isRTL ? "items-end" : "items-start"}`}
										>
											<Text
												className={`text-base font-medium text-foreground ${isRTL ? "text-right" : "text-left"}`}
											>
												{option.nativeName}
											</Text>
											<Text
												className={`text-sm text-muted-foreground ${isRTL ? "text-right" : "text-left"}`}
											>
												{option.name}
											</Text>
										</View>
									</View>

									<View className="ml-3">
										{isCurrentlyChanging ? (
											<ActivityIndicator
												size="small"
												className="text-primary"
											/>
										) : isSelected ? (
											<Check size={20} className="text-primary" />
										) : null}
									</View>
								</View>
							</Card>
						</TouchableOpacity>
					);
				})}
			</View>

			<View className="mt-6 p-4 bg-muted/50 rounded-lg">
				<Text
					className={`text-sm text-muted-foreground ${isRTL ? "text-right" : "text-left"}`}
				>
					{t("current")}:{" "}
					{
						languageOptions.find((opt) => opt.code === currentLanguage)
							?.nativeName
					}
				</Text>
			</View>
		</View>
	);
}
