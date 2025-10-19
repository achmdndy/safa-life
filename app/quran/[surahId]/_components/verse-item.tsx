import { Bookmark, Check } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

interface VerseItemProps {
	item: {
		id: number;
		arabic: string;
		translation: string;
		isBookmarked: boolean;
		isRead: boolean;
	};
	onBookmarkToggle: (verseId: number) => void;
	onReadToggle: (verseId: number) => void;
}

export function VerseItem({
	item,
	onBookmarkToggle,
	onReadToggle,
}: VerseItemProps) {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="p-4 border-b border-border">
			<View className="flex-row justify-between items-center mb-2">
				<Text className="text-lg font-bold text-foreground">{item.id}.</Text>
			</View>

			<Text className="text-right text-2xl font-arabic leading-relaxed mb-2 text-foreground">
				{item.arabic}
			</Text>
			<Text className="text-base text-muted-foreground leading-relaxed">
				{item.translation}
			</Text>

			<View className="flex-row justify-end gap-2 mt-4">
				<Pressable
					onPress={() => onBookmarkToggle(item.id)}
					className="p-2 rounded-full active:bg-accent"
				>
					<Icon
						as={Bookmark}
						size={20}
						color={
							item.isBookmarked
								? selectedTheme.primary
								: selectedTheme.secondary
						}
					/>
				</Pressable>
				<Pressable
					onPress={() => onReadToggle(item.id)}
					className="p-2 rounded-full active:bg-accent"
				>
					<Icon
						as={Check}
						size={20}
						color={
							item.isRead ? selectedTheme.primary : selectedTheme.secondary
						}
					/>
				</Pressable>
			</View>
		</View>
	);
}
