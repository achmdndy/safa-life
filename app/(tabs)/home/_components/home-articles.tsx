import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image } from "react-native";
import { themes, useTheme } from "@/contexts/theme-context";

export function HomeArticles() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	const articlesData = [
		{
			id: 1,
			title: "The Importance of Daily Prayer in Islam",
			subtitle: "Understanding the spiritual significance of Salah",
			date: "2 days ago",
			image: "https://images.unsplash.com/photo-1574246604907-db69e30ddb97?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzbGltfGVufDB8fDB8fHwy"
		},
		{
			id: 2,
			title: "Ramadan: A Month of Reflection and Growth",
			subtitle: "Preparing your heart and mind for the holy month",
			date: "5 days ago",
			image: "https://images.unsplash.com/photo-1618383406944-0df8186c3aff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzbGltfGVufDB8fDB8fHwy"
		},
		{
			id: 3,
			title: "Understanding the Quran: A Beginner's Guide",
			subtitle: "How to approach reading and understanding the Holy Book",
			date: "1 week ago",
			image: "https://images.unsplash.com/photo-1554976757-606d486f5d92?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D"
		},
		{
			id: 4,
			title: "The Beauty of Islamic Architecture",
			subtitle: "Exploring the spiritual symbolism in mosque design",
			date: "2 weeks ago",
			image: "https://images.unsplash.com/photo-1574246604907-db69e30ddb97?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzbGltfGVufDB8fDB8fHwy"
		}
	];

	return (
		<View className="px-4 mt-4">
			<View className="flex-row items-center justify-between">
				<Text className="font-semibold text-lg mb-2">Latest Articles</Text>
				<Button variant="ghost" size="sm">
					<Text>View More</Text>
				</Button>
			</View>

			<View className="mt-2 gap-4">
				{articlesData.map((article) => (
					<Card
						key={article.id.toString()}
						className="border-transparent p-4 flex-row gap-3 items-center"
						style={{
							shadowColor: selectedTheme.primary,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 4,
						}}
					>
						<AspectRatio ratio={1/1} className="w-24">
							<Image
								source={{ uri: article.image }}
								className="w-full h-full rounded-lg"
								resizeMode="cover"
							/>
						</AspectRatio>
						<View className="flex-1 gap-2">
							<View className="gap-1">
								<Text className="font-semibold text-base leading-5" numberOfLines={2}>
									{article.title}
								</Text>
								<Text className="text-muted-foreground text-sm leading-4" numberOfLines={2}>
									{article.subtitle}
								</Text>
							</View>
							<Text className="text-xs text-muted-foreground">
								{article.date}
							</Text>
						</View>
					</Card>
				))}
			</View>
		</View>
	);
}
