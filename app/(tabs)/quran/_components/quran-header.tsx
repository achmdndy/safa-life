import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Headphones, Search } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function QuranHeader() {
  const insets = useSafeAreaInsets()

  return (
    <View className="px-4 flex-row items-center justify-between gap-4" style={{paddingTop: insets.top}}>
      <Button className="rounded-full justify-start w-full flex-1" variant="outline">
				<Search width={20} height={20} />
				<Text className="text-muted-foreground">Search for surah, dua...</Text>
			</Button>
      <Button size="icon" variant="outline" className="rounded-full">
        <Headphones width={20} height={20} />
      </Button>
    </View>
  )
}