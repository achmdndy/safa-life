import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { FlashList } from "@shopify/flash-list";
import { View, Pressable, ScrollView, Image, Platform } from "react-native";
import { BookOpen, ChevronRight, BookText, Bookmark } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/theme-context";

export function ThematicLearningTab() {
  const insets = useSafeAreaInsets();
  const { currentTheme, themes } = useTheme();
  const selectedTheme = themes[currentTheme];

  const stories = [
    {
      id: "1",
      title: "Prophet Ibrahim's Faith",
      description: "The story of unwavering faith and submission to Allah",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: "2",
      title: "The Night Journey",
      description: "Prophet Muhammad's miraculous journey to Jerusalem",
      image: "https://images.unsplash.com/photo-1571620874594-d6df8b47f708?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzbGltfGVufDB8fDB8fHww"
    },
    {
      id: "3",
      title: "The Cave Companions",
      description: "Young believers who sought refuge in Allah's protection",
      image: "https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzbGltfGVufDB8fDB8fHww"
    },
    {
      id: "4",
      title: "Prophet Yusuf's Patience",
      description: "A tale of patience, forgiveness, and divine wisdom",
      image: "https://images.unsplash.com/photo-1605976528013-638e49b6599f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: "5",
      title: "The Righteous Caliph",
      description: "Stories of justice and leadership in early Islam",
      image: "https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzbGltfGVufDB8fDB8fHwy"
    }
  ];

  const topics = [
    { 
      id: "1", 
      title: "Faith & Belief", 
      count: 12, 
      image: "https://images.unsplash.com/photo-1616518883324-d7f5f1ce7e99?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "2", 
      title: "Prayer & Worship", 
      count: 8, 
      image: "https://images.unsplash.com/photo-1626079313403-7399d1aa95cf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "3", 
      title: "Charity & Giving", 
      count: 6, 
      image: "https://images.unsplash.com/photo-1616422840391-fa670d4b2ae7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "4", 
      title: "Patience & Trust", 
      count: 15, 
      image: "https://images.unsplash.com/photo-1523345863760-5b7f3472d14f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "5", 
      title: "Family Values", 
      count: 9, 
      image: "https://images.unsplash.com/photo-1590075865003-e48277faa558?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "6", 
      title: "Justice & Fairness", 
      count: 11, 
      image: "https://images.unsplash.com/photo-1489568685157-ec3bcd451894?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "7", 
      title: "Forgiveness", 
      count: 7, 
      image: "https://images.unsplash.com/photo-1655438806765-d70d1443dfa9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "8", 
      title: "Gratitude", 
      count: 10, 
      image: "https://images.unsplash.com/photo-1613752557137-80d06802ee2a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "9", 
      title: "Knowledge", 
      count: 13, 
      image: "https://images.unsplash.com/photo-1563300365-9c77e472e7a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "10", 
      title: "Compassion", 
      count: 8, 
      image: "https://images.unsplash.com/photo-1509095388837-6aa3e85dd7a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "11", 
      title: "Honesty", 
      count: 5, 
      image: "https://images.unsplash.com/photo-1597329084427-64a6518d0445?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "12", 
      title: "Perseverance", 
      count: 9, 
      image: "https://images.unsplash.com/photo-1652085287594-f51d192445b4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "13", 
      title: "Community", 
      count: 14, 
      image: "https://images.unsplash.com/photo-1616518883324-d7f5f1ce7e99?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    },
    { 
      id: "14", 
      title: "Reflection", 
      count: 6, 
      image: "https://images.unsplash.com/photo-1626079313403-7399d1aa95cf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D" 
    }
  ];

  return (
    <ScrollView 
      className="gap-6 mt-4"
      scrollEventThrottle={5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? insets.bottom + 110 : insets.bottom + 30 }}
    >
      <View className="gap-2">
        <View className="flex-row justify-between items-center mx-4">
          <View className="flex-row items-center">
            <Icon as={BookOpen} size={20} color={selectedTheme.primary} className="mr-2" />
            <Text className="font-bold text-xl">Stories</Text>
          </View>
          <Pressable className="flex-row items-center">
            <Text className="text-sm mr-1">View all</Text>
            <Icon as={ChevronRight} size={16} />
          </Pressable>
        </View>
        
        <FlashList
          data={stories}
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
                  shadowColor: selectedTheme.primary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}
              >
                <CardContent className="p-0">
                  <AspectRatio ratio={16/9}>
                    <Image 
                      source={{ uri: item.image }}
                      className="w-full h-full rounded-lg"
                      resizeMode="cover"
                    />
                    <View className="absolute top-2 right-2 rounded-full p-1" style={{ backgroundColor: selectedTheme.primary + '80' }}>
                      <Icon as={Bookmark} size={14} className="text-white" />
                    </View>
                  </AspectRatio>
                  <View className="mt-2">
                    <Text className="font-semibold text-base" numberOfLines={1}>{item.title}</Text>
                    <Text className="text-muted-foreground text-xs mt-1" numberOfLines={2}>{item.description}</Text>  
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
            <Icon as={BookText} size={20} color={selectedTheme.primary} className="mr-2" />
            <Text className="font-bold text-xl">Topics</Text>
          </View>
          <Pressable className="flex-row items-center">
            <Text className="text-sm mr-1">View all</Text>
            <Icon as={ChevronRight} size={16} />
          </Pressable>
        </View>
        
        <View className="flex-row flex-wrap justify-between">
          {topics.map((item) => (
            <Pressable key={item.id} className="w-[48%] mb-3">
              <Card
                className="border-transparent p-4"
                style={{
                  height: 100,
                  shadowColor: selectedTheme.primary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}
              >
                <CardContent className="p-0 flex-1">
                  <View className="flex-row gap-2 items-center h-full">
                    <View className="size-14 rounded-lg items-center justify-center overflow-hidden" style={{ backgroundColor: selectedTheme.primary + '20' }}>
                      <Image 
                        source={{ uri: item.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                    <View className="gap-1 flex-1 justify-center">
                      <Text className="font-semibold text-sm" numberOfLines={2}>{item.title}</Text>
                      <View className="px-2 py-1 rounded-md" style={{ backgroundColor: selectedTheme.secondary + '20' }}>
                        <Text className="text-xs" style={{ color: selectedTheme.primary }}>{item.count} stories</Text>
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