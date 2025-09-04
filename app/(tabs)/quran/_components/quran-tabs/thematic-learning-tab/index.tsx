import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { FlashList } from "@shopify/flash-list";
import { View, Pressable, ScrollView } from "react-native";
import { BookOpen, ChevronRight, BookText, Bookmark } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ThematicLearningTab() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView 
      className="gap-6 mt-4"
      scrollEventThrottle={5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}
    >
      <View className="gap-2">
        <View className="flex-row justify-between items-center mx-4">
          <View className="flex-row items-center">
            <Icon as={BookOpen} size={20} className="text-primary mr-2" />
            <Text className="font-bold text-xl">Stories</Text>
          </View>
          <Pressable className="flex-row items-center">
            <Text className="text-primary text-sm mr-1">View all</Text>
            <Icon as={ChevronRight} size={16} className="text-primary" />
          </Pressable>
        </View>
        
        <FlashList
          data={Array.from({length: 5}, (_, index) => ({title: `Story ${index + 1}`, description: "Short description about this story"}))}
          className="px-4 py-2"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          ItemSeparatorComponent={() => <View className="w-4" />}
          ListFooterComponent={() => <View className="w-4" />}
          renderItem={({item}) => (
            <Pressable>
              <Card
                className="border-transparent p-4"
                style={{
                  width: 220,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}
              >
                <CardContent className="p-0">
                  <AspectRatio ratio={16/9}>
                    <Skeleton className="w-full h-full bg-gray-200"/>
                    <View className="absolute top-2 right-2 bg-primary/80 rounded-full p-1">
                      <Icon as={Bookmark} size={14} className="text-white" />
                    </View>
                  </AspectRatio>
                  <View className="mt-2">
                    <Text className="font-semibold text-base">{item.title}</Text>
                    <Text className="text-muted-foreground text-xs mt-1">{item.description}</Text>
                  </View>
                </CardContent>
              </Card>
            </Pressable>
          )}
        />
      </View>
      
      <View className="gap-2 mx-4 mt-4">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <Icon as={BookText} size={20} className="text-primary mr-2" />
            <Text className="font-bold text-xl">Topics</Text>
          </View>
          <Pressable className="flex-row items-center">
            <Text className="text-primary text-sm mr-1">View all</Text>
            <Icon as={ChevronRight} size={16} className="text-primary" />
          </Pressable>
        </View>
        
        <View className="flex-row flex-wrap justify-between">
          {Array.from({length: 14}, (_, index) => ({title: `Topic ${index + 1}`, count: Math.floor(Math.random() * 20) + 1, id: index.toString()})).map((item) => (
            <Pressable key={item.id} className="w-[48%] mb-3">
              <Card
                className="border-transparent p-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}
              >
                <CardContent className="p-0">
                  <View className="flex-row gap-2 items-center">
                    <AspectRatio ratio={1/1} className="size-14">
                      <Skeleton className="w-full h-full bg-gray-300"/>
                    </AspectRatio>
                    <View className="gap-1">
                      <Text className="font-semibold">{item.title}</Text>
                      <View className="bg-primary/10 px-2 py-1 rounded-md">
                        <Text className="text-primary text-xs">{item.count} stories</Text>
                      </View>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}