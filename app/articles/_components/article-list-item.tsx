import { Link } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";

interface ArticleListItemProps {
	item: {
		id: string;
		title: string;
		author: string;
		date: string;
		image: string;
	};
}

export function ArticleListItem({ item }: ArticleListItemProps) {
	return (
		<Link href={`/articles/${item.id}`} asChild>
			<Pressable className="active:opacity-75 overflow-hidden">
				<View className="p-4 border-b border-border flex-row items-start gap-4">
					<Image
						source={{ uri: item.image }}
						className="w-24 h-24 rounded-lg bg-muted"
					/>
					<View className="flex-1">
						<Text
							className="text-lg font-bold text-foreground"
							numberOfLines={2}
						>
							{item.title}
						</Text>
						<Text className="text-sm text-muted-foreground mt-1">
							{item.author}
						</Text>
						<Text className="text-xs text-muted-foreground mt-1">
							{item.date}
						</Text>
					</View>
				</View>
			</Pressable>
		</Link>
	);
}
