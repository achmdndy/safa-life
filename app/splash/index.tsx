import { useTranslation } from "react-i18next";
import { ActivityIndicator, Animated, Platform, View } from "react-native";
import { AppImages } from "@/assets/images";
import { Text } from "@/components/ui/text";
import SplashBackground from "./_components/splash-background";
import { useSplash } from "./_hooks/use-splash";

export default function SplashScreen() {
	const { t } = useTranslation("splash");
	const {
		isRTL,
		logoFadeAnim,
		logoScaleAnim,
		textFadeAnim,
		textSlideAnim,
		loadingFadeAnim,
	} = useSplash();

	return (
		<View
			className="flex-1 relative bg-background"
			style={{ direction: isRTL ? "rtl" : "ltr" }}
		>
			{Platform.OS === "ios" && (
				<>
					<SplashBackground />
					<View className="absolute inset-0 bg-white/20 dark:bg-black/40" />
				</>
			)}

			<View className="absolute inset-0 flex-1 justify-center items-center px-8">
				<Animated.Image
					source={AppImages.splash}
					style={{
						opacity: logoFadeAnim,
						transform: [{ scale: logoScaleAnim }],
					}}
					className="w-72 h-72 mb-6"
				/>

				<Animated.View
					style={{
						opacity: textFadeAnim,
						transform: [{ translateY: textSlideAnim }],
					}}
					className="items-center"
				>
					<Text className="text-5xl font-bold text-foreground text-center mb-2 tracking-wider">
						{t("appName", { defaultValue: "Safa Life" })}
					</Text>
					<View className="w-20 h-1 bg-foreground/80 rounded-full mb-4" />
					<Text className="text-lg text-foreground/90 text-center font-medium leading-6">
						{t("tagline", { defaultValue: "Menjalani Hidup dengan Berkah" })}
					</Text>
					<Text className="text-base text-foreground/75 text-center mt-2 font-light">
						{t("subtitle", {
							defaultValue: "Panduan Spiritual untuk Kehidupan yang Bermakna",
						})}
					</Text>
				</Animated.View>

				<Animated.View
					style={{
						opacity: loadingFadeAnim,
					}}
					className={`absolute bottom-20 items-center`}
				>
					<ActivityIndicator color="#FFFFFF" />
					<Text className="text-foreground/70 text-sm mt-4 font-light text-center">
						{t("loading", { defaultValue: "Memuat..." }) || ""}
					</Text>
				</Animated.View>
			</View>
		</View>
	);
}
