import { router } from "expo-router";
import { ArrowLeft, Hash, Info, MapPin, ScrollText } from "lucide-react-native";
import { Animated, Pressable, Text, View } from "react-native";
import type { DtoSurahResponse } from "@/api/coreService/types/dto/SurahResponse.ts";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Text as UIText } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import { createTheme } from "@/lib/theme";

export const HEADER_HEIGHT = 80;

interface SurahHeaderProps {
	surahId?: string;
	surah?: DtoSurahResponse;
	headerTranslateY: Animated.Value;
	topInset: number;
	isLoading?: boolean;
}

export default function SurahHeader({
	surahId,
	surah,
	headerTranslateY,
	topInset,
	isLoading,
}: SurahHeaderProps) {
	const { currentTheme, theme } = useTheme();
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];
	const themeColors = createTheme(
		selectedTheme.primary,
		selectedTheme.secondary,
	);

	return (
		<Animated.View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1,
				backgroundColor: isDarkMode
					? themeColors.dark.card
					: themeColors.light.card,
				height: HEADER_HEIGHT + topInset,
				transform: [{ translateY: headerTranslateY }],
				paddingTop: topInset,
				borderBottomWidth: 1,
				borderBottomColor: isDarkMode
					? themeColors.dark.border
					: themeColors.light.border,
			}}
		>
			<View className="flex-row items-center justify-between px-4 h-full">
				<Pressable
					onPress={() => router.back()}
					className="p-2 rounded-full active:bg-accent"
				>
					<Icon as={ArrowLeft} size={24} color={selectedTheme.primary} />
				</Pressable>
				<View className="absolute left-0 right-0 items-center justify-center h-full pointer-events-none">
					{isLoading ? (
						<Skeleton className="h-5 w-40 rounded" />
					) : (
						<Text className="text-xl font-bold text-foreground">
							{surah?.nameEnglish || `Surah ${surahId}`}
						</Text>
					)}
				</View>
				<Dialog>
					<DialogTrigger asChild>
						<Pressable className="p-2 rounded-full active:bg-accent">
							<Icon as={Info} size={24} color={selectedTheme.primary} />
						</Pressable>
					</DialogTrigger>
					<DialogContent className="w-11/12 p-5">
						<DialogHeader>
							{isLoading ? (
								<View className="items-center">
									<Skeleton className="h-5 w-40 rounded mb-2" />
									<Skeleton className="h-7 w-48 rounded" />
								</View>
							) : (
								<>
									<DialogTitle className="text-center">
										{surah?.nameEnglish || `Surah ${surahId}`}
									</DialogTitle>
									{surah?.nameArabic ? (
										<UIText className="font-arabic text-2xl leading-8 text-center mt-1">
											{surah.nameArabic}
										</UIText>
									) : null}
								</>
							)}
						</DialogHeader>

						<Separator className="my-1" />

						<View className="mt-1 items-center gap-3">
							{/* Badges row */}
							{isLoading ? (
								<View className="flex-row flex-wrap items-center justify-center gap-2">
									<Skeleton className="h-6 w-20 rounded-full" />
									<Skeleton className="h-6 w-16 rounded-full" />
									<Skeleton className="h-6 w-24 rounded-full" />
								</View>
							) : (
								<View className="flex-row flex-wrap items-center justify-center gap-2">
									{surah?.revelationPlace ? (
										<Badge
											variant="secondary"
											className="rounded-full px-2.5 py-1"
										>
											<Icon
												as={MapPin}
												className="size-3 text-secondary-foreground"
											/>
											<UIText>{surah.revelationPlace}</UIText>
										</Badge>
									) : null}
									{typeof surah?.ayahCount === "number" ? (
										<Badge
											variant="outline"
											className="rounded-full px-2.5 py-1"
										>
											<Icon
												as={ScrollText}
												className="size-3 text-foreground"
											/>
											<UIText className="text-foreground">
												{surah.ayahCount} ayah
											</UIText>
										</Badge>
									) : null}
									{typeof surah?.revelationOrder === "number" ? (
										<Badge
											variant="outline"
											className="rounded-full px-2.5 py-1"
										>
											<Icon as={Hash} className="size-3 text-foreground" />
											<UIText className="text-foreground">
												Order {surah.revelationOrder}
											</UIText>
										</Badge>
									) : null}
								</View>
							)}

							{/* Subtext */}
							{isLoading ? (
								<Skeleton className="h-3 w-40 rounded mt-1" />
							) : surah?.nameEnglish ? (
								<UIText className="text-muted-foreground text-center text-xs">
									Basic information about this Surah
								</UIText>
							) : null}
						</View>
					</DialogContent>
				</Dialog>
			</View>
		</Animated.View>
	);
}
