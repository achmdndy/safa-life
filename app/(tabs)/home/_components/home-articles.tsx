import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

export function HomeArticles() {
	const { t } = useTranslation("home");
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	const articlesData = [
		{
			id: 1,
			title: t("articles.items.prayer.title"),
			subtitle: t("articles.items.prayer.subtitle"),
			date: t("articles.items.prayer.date"),
			image:
				"https://images.unsplash.com/photo-1574246604907-db69e30ddb97?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzbGltfGVufDB8fDB8fHwy",
		},
		{
			id: 2,
			title: t("articles.items.ramadan.title"),
			subtitle: t("articles.items.ramadan.subtitle"),
			date: t("articles.items.ramadan.date"),
			image:
				"https://images.unsplash.com/photo-1618383406944-0df8186c3aff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzbGltfGVufDB8fDB8fHwy",
		},
		{
			id: 3,
			title: t("articles.items.quran.title"),
			subtitle: t("articles.items.quran.subtitle"),
			date: t("articles.items.quran.date"),
			image:
				"https://images.unsplash.com/photo-1554976757-606d486f5d92?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D",
		},
		{
			id: 4,
			title: t("articles.items.architecture.title"),
			subtitle: t("articles.items.architecture.subtitle"),
			date: t("articles.items.architecture.date"),
			image:
				"https://images.unsplash.com/photo-1574246604907-db69e30ddb97?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzbGltfGVufDB8fDB8fHwy",
		},
	];

	return (
		<View
			className="px-4 mt-4"
			accessible={true}
			accessibilityLabel={t("articles.accessibility.section")}
		>
			<View
				className="flex-row items-center justify-between"
				accessible={true}
				accessibilityRole="header"
				accessibilityLabel={t("articles.accessibility.header")}
			>
				<Text
					className="font-semibold text-lg mb-2"
					accessible={true}
					accessibilityRole="text"
					accessibilityLabel={t("articles.accessibility.title")}
				>
					{t("articles.title")}
				</Text>
				<Link href="/articles" asChild>
					<Button
						variant="ghost"
						size="sm"
						accessible={true}
						accessibilityRole="button"
						accessibilityLabel={t("articles.accessibility.viewMore")}
					>
						<Text>{t("articles.viewMore")}</Text>
					</Button>
				</Link>
			</View>

			<View
				className="mt-2 gap-4"
				accessible={true}
				accessibilityLabel={t("articles.accessibility.list")}
			>
				{articlesData.map((article) => (
					<Link
						key={article.id.toString()}
						href={`/articles/${article.id}`}
						asChild
					>
						<Card
							className="border-transparent p-4 flex-row gap-3 items-center"
							style={{
								shadowColor: selectedTheme.primary,
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.1,
								shadowRadius: 4,
							}}
							accessible={true}
							accessibilityRole="button"
							accessibilityLabel={t("articles.accessibility.articleItem", {
								title: article.title,
								subtitle: article.subtitle,
								date: article.date,
							})}
						>
							<AspectRatio
								ratio={1 / 1}
								className="w-24"
								accessible={true}
								accessibilityRole="image"
								accessibilityLabel={t("articles.accessibility.articleImage", {
									title: article.title,
								})}
							>
								<Image
									source={{ uri: article.image }}
									className="w-full h-full rounded-lg"
									resizeMode="cover"
									accessible={false}
								/>
							</AspectRatio>
							<View
								className="flex-1 gap-2"
								accessible={true}
								accessibilityRole="text"
								accessibilityLabel={t("articles.accessibility.articleContent")}
							>
								<View className="gap-1">
									<Text
										className="font-semibold text-base leading-5"
										numberOfLines={2}
										accessible={true}
										accessibilityRole="text"
										accessibilityLabel={t("articles.accessibility.articleTitle", {
											title: article.title,
										})}
									>
										{article.title}
									</Text>
									<Text
										className="text-muted-foreground text-sm leading-4"
										numberOfLines={2}
										accessible={true}
										accessibilityRole="text"
										accessibilityLabel={t(
											"articles.accessibility.articleSubtitle",
											{ subtitle: article.subtitle },
										)}
									>
										{article.subtitle}
									</Text>
								</View>
								<Text
									className="text-xs text-muted-foreground"
									accessible={true}
									accessibilityRole="text"
									accessibilityLabel={t("articles.accessibility.articleDate", {
										date: article.date,
									})}
								>
									{article.date}
								</Text>
							</View>
						</Card>
					</Link>
				))}
			</View>
		</View>
	);
}
