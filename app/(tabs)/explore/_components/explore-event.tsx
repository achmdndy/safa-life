import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { CalendarClock, ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

export function ExploreEvent() {
  return (
    <View className="px-4 gap-4 mt-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Icon as={CalendarClock} size={20} className="text-primary mr-2" />
          <Text className="font-bold text-xl">Event</Text>
        </View>
        <Pressable className="flex-row items-center">
          <Text className="text-primary text-sm mr-1">View all</Text>
          <Icon as={ChevronRight} size={16} className="text-primary" />
        </Pressable>
      </View>

      <View className="gap-2">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} 
            className="p-2 border-transparent"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <CardContent className="p-0 flex-row items-center justify-between">
              <View className="flex-row gap-4 items-center">
                <View className="w-14 h-14">
                  <AspectRatio ratio={1/1} className="size-14">
                    <Skeleton className="w-full h-full rounded-md bg-gray-300"/>
                  </AspectRatio>
                </View>
                <View>
                  <Text className="text-muted-foreground text-xs">29 Sep 2025</Text>
                  <Text className="font-semibold text-base">Event {item}</Text>
                  <Text className="text-muted-foreground text-xs mt-1">Jakarta, Indonesia</Text>
                </View>
              </View>
              <Button size="icon" variant="outline" className="rounded-full">
                <Icon as={ChevronRight} size={16}/>
              </Button>
            </CardContent>
          </Card>
        ))}
      </View>
    </View>
  )
}