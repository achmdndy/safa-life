import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Compass, Newspaper, MessageSquare, MapPin, ChevronRight, ScrollText } from "lucide-react-native";
import { Pressable, View } from "react-native";

const discoverItems = [
  {
    id: 1,
    title: "Hadith & Sunnah",
    description: "Daily wisdom",
    icon: ScrollText
  },
  {
    id: 2,
    title: "Articles",
    description: "Islamic knowledge",
    icon: Newspaper
  },
  {
    id: 3,
    title: "Q&A",
    description: "Get answers",
    icon: MessageSquare
  },
  {
    id: 4,
    title: "Halal Finder",
    description: "Find halal places",
    icon: MapPin
  }
];

export function ExploreDiscoverMore() {
  return (
    <View className="gap-3 mt-4 px-4">
      <View className="flex-row justify-between items-center mb-1">
        <View className="flex-row items-center">
          <Icon as={Compass} size={20} className="text-primary mr-2" />
          <Text className="font-bold text-xl">Discover More</Text>
        </View>
        <Pressable className="flex-row items-center">
          <Text className="text-primary text-sm mr-1">View all</Text>
          <Icon as={ChevronRight} size={16} className="text-primary" />
        </Pressable>
      </View>

      <View className="flex-row flex-wrap justify-between gap-3">
        {discoverItems.map((item) => (
          <Card 
            key={item.id.toString()}
            className="p-2 border-transparent h-24 w-[48%]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <CardContent className="p-0">
              <View className="flex-col items-center justify-center p-4 h-full">
                <View className="w-10 h-10 rounded-full items-center justify-center mb-2 bg-gray-100">
                  <Icon as={item.icon} size={20} className="text-gray-600" />
                </View>
                <Text className="font-semibold text-sm text-center text-gray-800">{item.title}</Text>
                <Text className="text-gray-500 text-xs text-center">{item.description}</Text>
              </View>
            </CardContent>
          </Card>
        ))}
      </View>
    </View>
  )
}