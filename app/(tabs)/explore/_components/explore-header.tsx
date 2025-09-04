import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Search } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ExploreHeader() {
  const insets = useSafeAreaInsets()

  return (
    <View className="px-4 flex-row items-center justify-between gap-4 pb-4" style={{paddingTop: insets.top}}>
      <View>
        <Text className="text-2xl font-bold">Explore</Text>
      </View>
      <Button className="rounded-full justify-start w-full flex-1" variant="outline">
				<Search width={20} height={20} />
				<Text className="text-muted-foreground">Search for reels, event...</Text>
			</Button>
    </View>
  )
}