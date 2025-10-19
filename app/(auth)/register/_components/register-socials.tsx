import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { AppImages } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";

export function RegisterSocials() {
	const { t } = useTranslation("register");
	const { theme } = useTheme();
	const isDarkMode = theme === "dark";

	const SOCIAL_CONNECTION_STRATEGIES = [
		{
			type: "oauth_apple",
			source: isDarkMode ? AppImages.appleWhiteIcon : AppImages.appleIcon,
			accessibilityLabel: "accessibility.appleLogin",
		},
		{
			type: "oauth_google",
			source: AppImages.googleIcon,
			accessibilityLabel: "accessibility.googleLogin",
		},
		{
			type: "oauth_facebook",
			source: AppImages.facebookIcon,
			accessibilityLabel: "accessibility.facebookLogin",
		},
	];

	return (
		<View
			className="flex flex-row gap-4"
			accessible
			accessibilityLabel={t("accessibility.socialLoginSection")}
		>
			{SOCIAL_CONNECTION_STRATEGIES.map((strategy) => {
				return (
					<Button
						key={strategy.type}
						variant="outline"
						className="flex-1"
						accessible
						accessibilityRole="button"
						accessibilityLabel={t(strategy.accessibilityLabel)}
					>
						<Image className="size-5" source={strategy.source} />
					</Button>
				);
			})}
		</View>
	);
}
