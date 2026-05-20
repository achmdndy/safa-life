import { useRouter } from "expo-router";
import { Compass, Heart, PenTool, Utensils } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

export default function HomeFeatures() {
	const router = useRouter();
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { t } = useTranslation("home");

	const features = [
		{
			id: 1,
			name: t("features.items.qibla.title"),
			icon: Compass,
			description: t("features.items.qibla.subtitle"),
			href: "/features/qibla",
		},
		{
			id: 2,
			name: t("features.items.tasbih.title"),
			icon: Heart,
			description: t("features.items.tasbih.subtitle"),
			href: "/features/tasbih",
		},
		{
			id: 3,
			name: t("features.items.prayer.title"),
			icon: PenTool,
			description: t("features.items.prayer.subtitle"),
			href: "/features/prayer",
		},
		{
			id: 4,
			name: t("features.items.quran.title"),
			icon: Utensils,
			description: t("features.items.quran.subtitle"),
			href: "/features/quran",
		},
	];

	return (
		<View
			className="px-4 mt-4"
			accessible={true}
			accessibilityRole="text"
			accessibilityLabel={t("features.accessibility.sectionLabel")}
		>
			<View
				className="flex-row items-center justify-between"
				accessible={true}
				accessibilityRole="text"
				accessibilityLabel={t("features.accessibility.headerLabel")}
			>
				<Text
					className="font-semibold text-lg mb-2"
					accessible={true}
					accessibilityRole="header"
					accessibilityLabel={t("features.accessibility.titleLabel")}
				>
					{t("features.title")}
				</Text>
				<Button
					variant="ghost"
					size="sm"
					accessible={true}
					accessibilityRole="button"
					accessibilityLabel={t("features.accessibility.viewMoreButtonLabel")}
					accessibilityHint={t("features.accessibility.viewMoreButtonHint")}
				>
					<Text>{t("features.viewMore")}</Text>
				</Button>
			</View>

			<View
				className="flex-row items-center justify-between mt-2"
				accessible={true}
				accessibilityRole="text"
				accessibilityLabel={t("features.accessibility.featuresListLabel")}
			>
				{features.map((feature) => {
					const IconComponent = feature.icon;
					return (
						<Pressable
							className="flex-1 mx-1"
							key={feature.id}
							onPress={() => router.navigate(feature.href)}
							accessible={true}
							accessibilityRole="button"
							accessibilityLabel={t(
								"features.accessibility.featureButtonLabel",
								{
									title: feature.name,
									subtitle: feature.description,
								},
							)}
							accessibilityHint={t("features.accessibility.featureButtonHint", {
								title: feature.name,
							})}
						>
							<Card
								key={feature.id}
								className="border-transparent items-center bg-card rounded-lg p-3"
								style={{
									shadowColor: selectedTheme.primary,
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.1,
									shadowRadius: 4,
								}}
							>
								<CardContent className="p-0 items-center">
									<View
										className="w-10 h-10 rounded-full items-center justify-center mb-2"
										style={{ backgroundColor: `${selectedTheme.primary}20` }}
									>
										<IconComponent
											width={20}
											height={20}
											color={selectedTheme.primary}
										/>
									</View>
									<Text
										className="text-xs font-semibold text-center"
										numberOfLines={1}
									>
										{feature.name}
									</Text>
									<Text
										className="text-xs text-muted-foreground text-center mt-1"
										numberOfLines={1}
									>
										{feature.description}
									</Text>
								</CardContent>
							</Card>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
