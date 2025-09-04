import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/components/ui/icon";
import { Bell, Bookmark, CalendarClock, Forward, Heart } from "lucide-react-native";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export function DailyRemainderTab() {
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  
  // Data pengingat harian dengan lebih banyak item
  const reminderData = [
    {id: 1, title: "Morning Reminder", time: "05:00 AM", description: "Start your day with Quran recitation"},
    {id: 2, title: "Afternoon Reminder", time: "12:30 PM", description: "Take a moment to reflect on Quranic verses"},
    {id: 3, title: "Evening Reminder", time: "07:00 PM", description: "End your day with prayer and gratitude"},
  ];
  
  // Membuat data dummy yang lebih banyak
  const allReminderData = Array.from({length: 20}, (_, index) => {
    if (index < reminderData.length) {
      return reminderData[index];
    }
    return {
      id: index + 1,
      title: `Reminder ${index + 1}`,
      time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      description: `Custom reminder ${index + 1} for your daily Quran practice`,
    };
  });
  
  return (
    <View className="gap-2 mt-4">
      <View className="mx-4 flex-row items-center">
        <Icon as={Bell} size={20} className="text-primary mr-2" />
        <Text className="font-bold text-xl">Daily Reminder</Text>
      </View>

      <View
        style={{ 
          height: height - 200,
        }}
      >
        <FlashList
          data={allReminderData}
          className="px-4 pt-2"
          ItemSeparatorComponent={() => <View className="h-4" />}
          ListFooterComponent={<View style={{
            paddingBottom: insets.bottom + 70,
          }}/>}
          renderItem={({item}) => (
            <Card 
              key={item.id}
              className="border-transparent p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <CardContent className="p-0">
                <AspectRatio ratio={7/3}>
                  <Skeleton className="w-full h-full bg-gray-300"/>
                </AspectRatio>
                <View className="mt-2">
                  <Text className="font-semibold">{item.title}</Text>
                  <Text className="text-muted-foreground text-sm">{item.description}</Text>
                </View>
                <View className="flex-row items-center justify-between mt-4">
                  <View className="flex-row items-center">
                    <Icon as={Heart} size={18} className="text-primary mr-1" />
                    <Text className="text-muted-foreground text-sm">123</Text>
                  </View>

                  <View className="flex-row items-center gap-4">
                    <View className="flex-row items-center">
                      <Icon as={Bookmark} size={18} className="text-primary mr-1" />
                      <Text className="text-muted-foreground text-sm">123</Text>
                    </View>

                    <View className="flex-row items-center">
                      <Icon as={Forward} size={18} className="text-primary mr-1" />
                      <Text className="text-muted-foreground text-sm">123</Text>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}