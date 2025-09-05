import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";
import { Headphones, Search } from "lucide-react-native";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function QuranHeader() {
  const insets = useSafeAreaInsets()
  const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

  return (
    <View className="px-4 flex-row items-center justify-between gap-4" style={{paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 20}}>
      <Button className="rounded-full justify-start w-full flex-1" variant="outline">
				<Icon as={Search} size={20} stroke={selectedTheme.primary}/>
				<Text className="text-muted-foreground">Search for surah, dua...</Text>
			</Button>
      <Button size="icon" variant="outline" className="rounded-full">
        <Icon as={Headphones} size={20} stroke={selectedTheme.primary} />
      </Button>
    </View>
  )
}