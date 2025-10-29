import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";
import { MOCK_ARTICLES } from "../_data/articles";
import { ArticleDetailHeader } from "./_components/article-detail-header";

const HEADER_IMAGE_HEIGHT = 300;

export default function ArticleDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const article = MOCK_ARTICLES.find((a) => a.id === id);
	const { t } = useTranslation("articles");
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const scrollA = useRef(new Animated.Value(0)).current;

	if (!article) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text>Article not found.</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background">
			<StatusBar
				barStyle={theme === "dark" ? "light-content" : "dark-content"}
			/>
			<ArticleDetailHeader title={article.title} scrollA={scrollA} />
			<Animated.ScrollView
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollA } } }],
					{ useNativeDriver: true },
				)}
				scrollEventThrottle={16}
			>
				<Animated.Image
					source={{ uri: article.image }}
					style={{
						height: HEADER_IMAGE_HEIGHT + insets.top,
						width: "100%",
						transform: [
							{
								translateY: scrollA.interpolate({
									inputRange: [-HEADER_IMAGE_HEIGHT, 0, HEADER_IMAGE_HEIGHT],
									outputRange: [
										-HEADER_IMAGE_HEIGHT / 2,
										0,
										HEADER_IMAGE_HEIGHT * 0.75,
									],
								}),
							},
							{
								scale: scrollA.interpolate({
									inputRange: [-HEADER_IMAGE_HEIGHT, 0],
									outputRange: [2, 1],
									extrapolate: "clamp",
								}),
							},
						],
					}}
				/>
				<View className="p-6 bg-background -mt-4 rounded-t-2xl">
					<Text className="text-3xl font-bold text-foreground mb-2">
						{article.title}
					</Text>
					<View className="flex-row items-center mb-4">
						<Text className="text-base text-muted-foreground">
							{t("detail.by")} {article.author}
						</Text>
						<Text className="text-base text-muted-foreground mx-2">•</Text>
						<Text className="text-base text-muted-foreground">
							{article.date}
						</Text>
					</View>
					<Text className="text-lg text-foreground leading-relaxed">
						{article.content}
					</Text>
				</View>
			</Animated.ScrollView>
		</View>
	);
}