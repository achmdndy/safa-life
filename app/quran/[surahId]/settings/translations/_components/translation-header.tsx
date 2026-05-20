import { View } from "@rn-primitives/slot";
import { Text } from "@/components/ui/text";

export default function TranslationHeader() {
	return (
		<View className="flex-row items-center justify-between px-4">
			<Text className="text-lg font-bold">Translations</Text>
		</View>
	);
}
