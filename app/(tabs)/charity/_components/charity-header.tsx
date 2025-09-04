import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Search, Bell } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ChairityHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View className="px-4 pb-4 bg-primary rounded-b-3xl" style={{paddingTop: insets.top}}>
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-white text-2xl font-bold">Charity</Text>
          <Text className="text-white/80 text-sm">Make a difference today</Text>
        </View>
        <Button 
          size="icon" 
          variant="ghost" 
          className="rounded-full bg-white/20"
        >
          <Icon as={Bell} size={20} className="text-white" />
        </Button>
      </View>
      
      <Button 
        className="rounded-full justify-start w-full border-0" 
        variant="outline"
      >
        <Icon as={Search} size={20} className="text-gray-600 mr-2" />
        <Text className="text-gray-600 flex-1 text-left">Search charities, causes...</Text>
      </Button>
    </View>
  )
}