import { Bookmark, Check, PlayCircle } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";
import { useBookmark } from "../_hooks/use-bookmark";

interface VerseItemProps {
	item: {
		id: string;
		arabic: string;
		translation: string;
		isBookmarked: boolean;
		isRead: boolean;
		numberInSurah: number;
		isBismillahOnly?: boolean;
		displayNumber?: number;
	};
	isActive?: boolean;
	onBookmarkToggle: (verseId: string) => void;
	onReadToggle: (verseId: string) => void;
}

export default function VerseItem({
	item,
	isActive = false,
	onBookmarkToggle,
	onReadToggle,
}: VerseItemProps) {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];
	const { toggleBookmark } = useBookmark();
	const handleBookmarkPress = () => {
		toggleBookmark({ ayahId: item.id, onLocalToggle: onBookmarkToggle });
	};

	// Special rendering for Bismillah-only: center and show only Arabic text
	if (item.isBismillahOnly) {
		return (
			<View className="p-6 border-b border-border items-center justify-center">
				<Text className="text-center text-3xl font-arabic leading-relaxed text-foreground">
					{item.arabic}
				</Text>
			</View>
		);
	}

	return (
		<View
			className={`p-4 border-b border-border ${isActive ? "bg-accent/20" : ""}`}
		>
			<View className="flex-row items-center mb-2">
				<View className="self-start rounded-full px-2 py-0.5 bg-accent/20">
					<Text className="text-xs text-muted-foreground">
						{item.displayNumber ?? item.numberInSurah}
					</Text>
				</View>
				{isActive ? (
					<View className="ml-2">
						<Icon as={PlayCircle} size={16} color={selectedTheme.primary} />
					</View>
				) : null}
			</View>
			<Text className="text-right text-3xl font-arabic leading-relaxed mb-2 text-foreground">
				{item.arabic}
			</Text>
			<Text className="text-base text-muted-foreground leading-relaxed">
				{item.translation}
			</Text>

			<View className="flex-row justify-end gap-2 mt-4">
				<Pressable
					onPress={handleBookmarkPress}
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
