import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { FlashList } from "@shopify/flash-list";
import { Clapperboard, ChevronRight, Play } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function ExploreReels() {
  return (
    <View className="gap-2">
      <View className="flex-row justify-between items-center mx-4">
        <View className="flex-row items-center">
          <Icon as={Clapperboard} size={20} className="text-primary mr-2" />
          <Text className="font-bold text-xl">Reels</Text>
        </View>
        <Pressable className="flex-row items-center">
          <Text className="text-primary text-sm mr-1">View all</Text>
          <Icon as={ChevronRight} size={16} className="text-primary" />
        </Pressable>
      </View>

      <FlashList
        data={Array.from({length: 5}, (_, index) => ({title: `Reel ${index + 1}`, description: "Short Islamic video content"}))}  
        className="px-4 py-2"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        ItemSeparatorComponent={() => <View className="w-2" />}
        ListFooterComponent={() => <View className="w-4" />}
        renderItem={({item}) => (
          <Pressable>
            <Card
              className="border-transparent p-0 w-full"
              style={{
                width: 160,
              }}
            >
              <CardContent className="p-0">
                <AspectRatio ratio={9/16}>
                  <Skeleton className="w-full h-full bg-gray-300"/>
                  <View className="absolute inset-0 items-center justify-center">
                    <View className="bg-primary/20 w-12 h-12 rounded-full items-center justify-center">
                      <Icon as={Play} size={24} className="text-white ml-1" />
                    </View>
                  </View>
                </AspectRatio>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 80,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                >
                  <View className="absolute bottom-3 left-3 right-3">
                    <Text className="font-semibold text-base text-white">{item.title}</Text>
                    <Text 
                      className="text-white/80 text-xs"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >{item.description}</Text>
                  </View>
                </LinearGradient>
              </CardContent>
            </Card>
          </Pressable>
        )}
      />
    </View>
  )
}