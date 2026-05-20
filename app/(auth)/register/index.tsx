import { useNavigation } from "expo-router";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import RegisterForm from "./_components/register-form";
import RegisterGuestButton from "./_components/register-guest-button";
import RegisterHeader from "./_components/register-header";
import RegisterSocials from "./_components/register-socials";

export default function RegisterScreen() {
	const insets = useSafeAreaInsets();
	const { t } = useTranslation("register");
	const navigation = useNavigation();

	return (
		<View className="bg-background flex-1">
			<View
				className="flex-row justify-between items-center p-4"
				style={{ paddingTop: insets.top }}
			>
				<Button
					variant="ghost"
					size="icon"
					onPress={() => navigation.goBack()}
					accessible
					accessibilityRole="button"
					accessibilityLabel={t("accessibility.backButton")}
					accessibilityHint={t("accessibility.backButtonHint")}
				>
					<Icon as={ChevronLeft} className="text-foreground" size={24} />
				</Button>
				<RegisterGuestButton />
			</View>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					paddingHorizontal: 24,
					paddingBottom: insets.bottom + 24,
				}}
				keyboardShouldPersistTaps="handled"
			>
				<RegisterHeader />
				<RegisterSocials />
				<View
					className="flex flex-row items-center gap-4 my-4"
					accessible
					accessibilityLabel={t("accessibility.orSeparator")}
				>
					<Separator className="flex-1" />
					<Text variant="muted" className="flex-4 text-center text-sm">
						{t("orSignUpWithEmail")}
					</Text>
					<Separator className="flex-1" />
				</View>
				<RegisterForm />
				<Button
					variant={"secondary"}
					className="flex flex-row items-center justify-center gap-4 mt-6"
					accessible
					accessibilityRole="button"
					accessibilityLabel={t("accessibility.contactSupport")}
					accessibilityHint={t("accessibility.contactSupportHint")}
				>
					<Icon as={Phone} className="text-foreground" size={20} />
					<Text variant="muted" className="text-sm">
						{t("havingTrouble")}
					</Text>
					<Icon as={ChevronRight} className="text-foreground" size={20} />
				</Button>
			</ScrollView>
		</View>
	);
}
