import { useRouter } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

export function QuranHeader() {
	const insets = useSafeAreaInsets();
	const router = useRouter();

	return (
		<View
			className="flex-row items-center justify-between px-4 gap-2 pb-4"
			style={{ paddingTop: insets.top }}
		>
			<Button
				size="icon"
				variant="outline"
				className="rounded-full"
				onPress={() => router.replace("/quran")}
			>
				<Icon as={ChevronLeft} size={20} />
			</Button>

			<View className="relative w-full flex-1">
				<View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
					<Icon as={Search} size={20} />
				</View>

				<Input className="rounded-full flex-1 pl-10" placeholder="Saerch..." />
			</View>
		</View>
	);
}
