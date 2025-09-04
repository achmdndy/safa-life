import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { CalendarClock, ChevronRight, Heart, HandHeart, Gift, Users } from "lucide-react-native";
import { Pressable, View } from "react-native";

const purposeItems = [
  {
    id: 1,
    title: "Sadaqah",
    icon: Heart
  },
  {
    id: 2,
    title: "Zakat",
    icon: HandHeart
  },
  {
    id: 3,
    title: "Infaq",
    icon: Gift
  },
  {
    id: 4,
    title: "Wakaf",
    icon: Users
  },
  {
    id: 5,
    title: "Fidyah",
    icon: Heart
  },
  {
    id: 6,
    title: "Kaffarah",
    icon: HandHeart
  }
];

export function ChairityGivePurpose() {
  return (
    <View className="px-4 gap-4 mt-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Icon as={CalendarClock} size={20} className="text-primary mr-2" />
          <Text className="font-bold text-xl">Give with Purpose</Text>
        </View>
        <Pressable className="flex-row items-center">
          <Text className="text-primary text-sm mr-1">View all</Text>
          <Icon as={ChevronRight} size={16} className="text-primary" />
        </Pressable>
      </View>

      <View className="flex-row flex-wrap justify-between gap-2">
        {purposeItems.map((item) => (
          <Pressable 
            key={item.id} 
            className="w-[31%] items-center p-3 bg-white rounded-xl border border-gray-100"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mb-2">
              <Icon as={item.icon} size={20} className="text-gray-600" />
            </View>
            <Text className="text-sm font-medium text-gray-800 text-center">{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}