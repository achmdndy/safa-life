import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View, Dimensions, Pressable, Alert } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/components/ui/icon";
import { Bookmark, BookmarkX } from "lucide-react-native";
import { useState } from "react";

export function BookmarkList() {
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  const [bookmarkData, setBookmarkData] = useState([
    { 
      id: 1, 
      surahId: 2,
      surahName: "البقرة", 
      surahNameTranslit: "Al-Baqarah", 
      ayatNumber: 255, 
      totalAyat: 286,
      lastRead: "2 days ago",
      text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ",
    },
    { 
      id: 2, 
      surahId: 36,
      surahName: "يس", 
      surahNameTranslit: "Yasin", 
      ayatNumber: 1, 
      totalAyat: 83,
      lastRead: "1 week ago",
      text: "يس",
    },
    { 
      id: 3, 
      surahId: 55,
      surahName: "الرحمن", 
      surahNameTranslit: "Ar-Rahman", 
      ayatNumber: 33, 
      totalAyat: 78,
      lastRead: "2 weeks ago",
      text: "يَا مَعْشَرَ الْجِنِّ وَالْإِنسِ إِنِ اسْتَطَعْتُمْ أَن تَنفُذُوا مِنْ أَقْطَارِ السَّمَاوَاتِ وَالْأَرْضِ فَانفُذُوا ۚ",
    },
    { 
      id: 4, 
      surahId: 1,
      surahName: "الفاتحة", 
      surahNameTranslit: "Al-Fatihah", 
      ayatNumber: 1, 
      totalAyat: 7,
      lastRead: "3 weeks ago",
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    },
    { 
      id: 5, 
      surahId: 112,
      surahName: "الإخلاص", 
      surahNameTranslit: "Al-Ikhlas", 
      ayatNumber: 1, 
      totalAyat: 4,
      lastRead: "1 month ago",
      text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    },
  ]);
  
  const removeBookmark = (id: number) => {
    Alert.alert(
      "Remove Bookmark",
      "Are you sure you want to remove this bookmark?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            setBookmarkData(bookmarkData.filter(item => item.id !== id));
          },
          style: "destructive"
        }
      ]
    );
  };
  
  return (
    <View>
      <Card 
        className="mb-4 p-4 border-transparent mx-4"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}  
      >
        <CardContent className="p-0">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="bg-primary w-10 h-10 rounded-full items-center justify-center mr-3">
                <Icon as={Bookmark} size={20} className="text-primary-foreground" />
              </View>
              <View>
                <Text className="font-semibold text-lg">My Bookmarks</Text>
                <Text className="text-muted-foreground mt-1">Total: {bookmarkData.length} bookmarks</Text>
                {bookmarkData.length > 0 && (
                  <Text className="text-muted-foreground">Last: {bookmarkData[0].surahNameTranslit} verse {bookmarkData[0].ayatNumber}</Text>
                )}
              </View>
            </View>
          </View>
        </CardContent>
      </Card>

      <View
        style={{ 
          height: height - 200,
        }}
      >
        <FlashList
          data={bookmarkData}
          className="px-4 pt-2"
          ListFooterComponent={<View style={{
            paddingBottom: insets.bottom + 200,
          }}/>}
          renderItem={({item}) => (
            <Card 
              className="mb-2 border-transparent p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <CardContent className="p-0">
                <View className="mb-2 flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View className="bg-primary w-10 h-10 rounded-full items-center justify-center mr-3">
                      <Text className="text-primary-foreground font-bold">{item.surahId}</Text>
                    </View>
                    <View>
                      <Text className="font-semibold">{item.surahNameTranslit}</Text>
                      <Text className="text-primary font-medium">{item.surahName}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <View className="items-end mr-2">
                      <Text className="font-semibold text-base">Verse {item.ayatNumber}</Text>
                      <Text className="text-muted-foreground text-xs">{item.lastRead}</Text>
                    </View>
                    <Pressable 
                      onPress={() => removeBookmark(item.id)}
                      className="p-2 bg-gray-100 rounded-full"
                      hitSlop={8}
                    >
                      <Icon as={BookmarkX} size={18} className="text-gray-500" />
                    </Pressable>
                  </View>
                </View>
                
                <View className="bg-gray-50 p-3 rounded-lg mt-2">
                  <Text className="text-right text-lg font-arabic" style={{ lineHeight: 32 }}>
                    {item.text}
                  </Text>
                </View>
              </CardContent>
            </Card>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center p-8">
              <Icon as={Bookmark} size={40} className="text-gray-300 mb-4" />
              <Text className="text-muted-foreground text-center">No bookmarks yet</Text>
              <Text className="text-muted-foreground text-center text-sm">Bookmarked verses will appear here</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}