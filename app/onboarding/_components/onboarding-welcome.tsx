import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";
import Animated, {
	interpolate,
	type SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppImages } from "@/assets/images";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { useOnboardingLanguageSelection } from "../_hooks/use-onboarding-language-selection";

type OnboardingWelcome = ComponentProps<typeof Animated.View> & {
	onNextClick: () => void;
	animationProgress: SharedValue<number>;
};

export default function OnboardingWelcome({
	onNextClick,
	animationProgress,
}: OnboardingWelcome) {
	const { t } = useTranslation("onboarding");
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { languageOptions, handleLanguageChange, currentLanguage } =
		useOnboardingLanguageSelection();

	// Wrapper function to handle direct language code selection
	const handleDirectLanguageChange = (languageCode: string) => {
		const languageOption = languageOptions.find(
			(lang) => lang.code === languageCode,
		);
		if (languageOption) {
			handleLanguageChange({
				value: languageOption.code,
				label: `${languageOption.flag} ${languageOption.nativeName}`,
			});
		}
	};

	const window = useWindowDimensions();
	const insets = useSafeAreaInsets();

	const windowHeight = window.height;
	const windowWidth = window.width;

	const welcomeAnimatedStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			animationProgress.value,
			[0, 0.2, 0.8],
			[0, -windowHeight, -windowHeight],
		);
		return {
			transform: [{ translateY }],
		};
	});

	const introImageData = Image.resolveAssetSource(AppImages.onboarding_welcome);

	return (
		<Animated.View className="flex-1" style={welcomeAnimatedStyle}>
			<ScrollView
				className="flex-grow-0"
				alwaysBounceVertical={false}
				accessible={false}
			>
				<View
					style={{ paddingTop: insets.top }}
					accessible={true}
					accessibilityRole="image"
					accessibilityLabel={t("welcome.accessibility.image")}
				>
					<Image
						style={{
							width: windowWidth,
							height: undefined,
							aspectRatio: introImageData
								? introImageData.width / introImageData.height
								: 357 / 470,
						}}
						source={AppImages.onboarding_welcome}
					/>
				</View>
				<Text
					className="text-2xl md:text-3xl lg:text-4xl text-center font-bold py-2 px-4"
					style={{
						color: selectedTheme.primary,
						fontSize: Math.min(window.width * 0.08, 32),
					}}
					accessible={true}
					accessibilityRole="header"
					accessibilityLabel={t("welcome.accessibility.title")}
				>
					{t("welcome.title")}
				</Text>
				<Text
					className="text-muted-foreground text-center px-6 md:px-8 lg:px-12"
					style={{
						fontSize: Math.min(window.width * 0.04, 16),
						lineHeight: Math.min(window.width * 0.06, 24),
					}}
					accessible={true}
					accessibilityRole="text"
					accessibilityLabel={t("welcome.accessibility.subtitle")}
				>
					{t("welcome.subtitle")}
				</Text>
			</ScrollView>

			<View
				className="flex-grow items-center justify-center pt-2 gap-y-4"
				style={{ paddingBottom: 8 + insets.bottom }}
			>
				<Combobox
					options={languageOptions.map((language) => ({
						value: language.code,
						label: `${language.flag} ${language.nativeName}`,
					}))}
					value={currentLanguage}
					onValueChange={(value) => handleDirectLanguageChange(value as string)}
					placeholder={t("welcome.selectLanguage")}
					emptyText={t("welcome.noLanguagesFound", {
						defaultValue: "No languages found",
					})}
					searchable={true}
					className="w-56"
				/>

				<Button
					size="lg"
					className="h-14 w-56"
					style={{ backgroundColor: selectedTheme.primary }}
					onPress={() => onNextClick()}
					accessible={true}
					accessibilityRole="button"
					accessibilityLabel={t("welcome.accessibility.button")}
					accessibilityHint={t("navigation.accessibility.next")}
				>
					<Text className="text-lg text-white">{t("welcome.button")}</Text>
				</Button>
			</View>
		</Animated.View>
	);
}
