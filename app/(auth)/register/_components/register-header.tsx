import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { AppImages } from "@/assets/images";
import { Text } from "@/components/ui/text";

export default function RegisterHeader() {
	const { t } = useTranslation("register");

	return (
		<View className="flex items-center justify-center pt-4">
			<Image
				style={{
					width: "50%",
					height: undefined,
					aspectRatio: 1 / 1,
				}}
				source={AppImages.register}
				accessible
				accessibilityRole="image"
				accessibilityLabel={t("accessibility.welcomeImage")}
			/>
			<Text
				variant="h3"
				className="text-center mb-2 mt-4"
				accessible
				accessibilityRole="header"
				accessibilityLabel={t("accessibility.title")}
			>
				{t("title")}
			</Text>
			<Text
				variant="muted"
				className="text-center mb-8"
				accessible
				accessibilityLabel={t("accessibility.subtitle")}
			>
				{t("subtitle")}
			</Text>
		</View>
	);
}
