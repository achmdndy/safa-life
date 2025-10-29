import { router } from "expo-router";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react-native";
import { Animated, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

export const HEADER_HEIGHT = 90;

interface ArticleDetailHeaderProps {
	title: string;
	scrollA: Animated.Value;
}

export function ArticleDetailHeader({ title, scrollA }: ArticleDetailHeaderProps) {
	const insets = useSafeAreaInsets();
	const { currentTheme, theme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const isDarkMode = theme === "dark";

	const headerBackgroundColor = scrollA.interpolate({
		inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 40],
		outputRange: ["transparent", isDarkMode ? "#18181b" : "#FFFFFF"],
		extrapolate: "clamp",
	});

	const titleOpacity = scrollA.interpolate({
		inputRange: [HEADER_HEIGHT + 40, HEADER_HEIGHT + 70],
		outputRange: [0, 1],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			style={{
				paddingTop: insets.top,
				backgroundColor: headerBackgroundColor,
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1,
			}}
		>
			<View className="flex-row items-center justify-between px-4 h-20">
				<Pressable
					onPress={() => router.back()}
					className="p-2 -ml-2 rounded-full bg-black/40 active:bg-accent"
				>
					<Icon as={ArrowLeft} size={24} color="#FFFFFF" />
				</Pressable>
				<Animated.View style={{ opacity: titleOpacity }}>
					<Text
						className="text-lg font-bold text-foreground max-w-[60%]"
						numberOfLines={1}
					>
						{title}
					</Text>
				</Animated.View>
				<View className="flex-row gap-2">
					<Pressable
						onPress={() => {}}
						className="p-2 rounded-full bg-black/40 active:bg-accent"
					>
						<Icon as={Bookmark} size={24} color="#FFFFFF" />
					</Pressable>
					<Pressable
						onPress={() => {}}
						className="p-2 rounded-full bg-black/40 active:bg-accent"
					>
						<Icon as={Share2} size={24} color="#FFFFFF" />
					</Pressable>
				</View>
			</View>
		</Animated.View>
	);
}
