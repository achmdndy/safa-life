import { FlashList } from "@shopify/flash-list";
import { StatusBar, View } from "react-native";
import { useTheme } from "@/contexts/theme-context";
import { ArticleListItem } from "./_components/article-list-item";
import { ArticlesHeader } from "./_components/articles-header";
import { MOCK_ARTICLES } from "./_data/articles";

export default function ArticlesScreen() {
	const { theme } = useTheme();

	return (
		<View className="flex-1 bg-background">
			<StatusBar
				barStyle={theme === "dark" ? "light-content" : "dark-content"}
			/>
			<ArticlesHeader />
			<FlashList
				data={MOCK_ARTICLES}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <ArticleListItem item={item} />}
			/>
		</View>
	);
}