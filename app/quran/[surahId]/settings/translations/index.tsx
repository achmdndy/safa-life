import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslationList } from "@/app/quran/[surahId]/_hooks/use-translation-list";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";

export default function QuranBySurahIdTranslationsScreen() {
	const router = useRouter();
	const { bottom } = useSafeAreaInsets();
	const { editions, isLoading, selectedEditionId, selectEdition } =
		useTranslationList();

	return (
		<View className="flex-1 bg-background">
			<View className="px-4 pt-4">
				<Text className="text-xl font-semibold mb-2">Translations</Text>
				<Text className="text-muted-foreground mb-4">
					Choose a translation edition for this surah.
				</Text>
			</View>
			<ScrollView
				contentContainerStyle={{ paddingBottom: bottom + 24 }}
				className="flex-1"
			>
				<View className="px-4">
					{isLoading
						? Array.from({ length: 8 }).map((_, i) => (
								<View key={`edition-skel-${i.toString()}`}>
									<View className="py-3">
										<Skeleton className="w-48 h-4 rounded mb-2" />
										<Skeleton className="w-32 h-3 rounded" />
									</View>
									<Separator />
								</View>
							))
						: editions.map((ed) => {
								const selected = selectedEditionId === ed.id;
								return (
									<View key={ed.id}>
										<Pressable
											onPress={() => {
												selectEdition(ed.id);
												router.back();
											}}
											className="py-3"
										>
											<Text
												className="text-base font-medium"
												style={{ opacity: selected ? 1 : 0.9 }}
											>
												{ed.name}
											</Text>
											<Text className="text-xs text-muted-foreground mt-1">
												{ed.language ?? ""}
												{ed.author ? ` • ${ed.author}` : ""}
											</Text>
										</Pressable>
										<Separator />
									</View>
								);
							})}
				</View>
			</ScrollView>
		</View>
	);
}
