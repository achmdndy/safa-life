import { ChevronRight, Phone } from "lucide-react-native";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { LoginForm } from "./_components/login-form";
import { LoginHeader } from "./_components/login-header";
import { LoginSocials } from "./_components/login-socials";

export const HEADER_MAX_HEIGHT = 320;
export const HEADER_MIN_HEIGHT = 160;
export const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function LoginScreen() {
	const scrollOffsetY = useRef(new Animated.Value(0)).current;
	const { t } = useTranslation("login");
	const insets = useSafeAreaInsets();

	return (
		<View
			className="flex-1 bg-background"
			accessible
			accessibilityLabel={t("accessibility.screen")}
		>
			<Animated.ScrollView
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
				bounces={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
					{
						useNativeDriver: false,
					},
				)}
				contentContainerStyle={{
					paddingTop: HEADER_MAX_HEIGHT,
					paddingBottom: Platform.OS === "ios" ? insets.bottom + 40 : 40,
					paddingHorizontal: 24,
				}}
			>
				<Text
					variant="h3"
					accessible
					accessibilityRole="header"
					accessibilityLabel={t("accessibility.title")}
				>
					{t("title")}
				</Text>
				<Text
					variant="muted"
					accessible
					accessibilityLabel={t("accessibility.subtitle")}
				>
					{t("subtitle")}
				</Text>

				<View className="mt-8">
					<LoginForm />
					<View
						className="flex flex-row items-center gap-4 my-4"
						accessible
						accessibilityLabel={t("accessibility.orSeparator")}
					>
						<Separator className="flex-1" />
						<Text variant="muted" className="flex-4 text-center text-sm">
							{t("orUseAccount")}
						</Text>
						<Separator className="flex-1" />
					</View>
					<LoginSocials />
					<Button
						variant={"secondary"}
						className="flex flex-row items-center justify-center gap-4 mt-6"
						accessible
						accessibilityRole="button"
						accessibilityLabel={t("accessibility.contactSupport")}
						accessibilityHint={t("accessibility.contactUsButtonHint")}
					>
						<Icon as={Phone} className="text-foreground" size={20} />
						<Text variant="muted" className="text-sm">
							{t("havingTrouble")}
						</Text>
						<Icon as={ChevronRight} className="text-foreground" size={20} />
					</Button>
				</View>
			</Animated.ScrollView>

			<LoginHeader value={scrollOffsetY} />
		</View>
	);
}
