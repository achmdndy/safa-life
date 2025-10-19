import { ChevronRight, Phone } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { TwoFAForm } from "./_components/2fa-form";
import { TwoFAHeader } from "./_components/2fa-header";

export default function TwoFAScreen() {
	const insets = useSafeAreaInsets();
	const { t } = useTranslation("twoFa");

	return (
		<View className="bg-background flex-1">
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					paddingHorizontal: 24,
					paddingBottom: insets.bottom + 24,
				}}
				keyboardShouldPersistTaps="handled"
			>
				<TwoFAHeader />
				<TwoFAForm />
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
