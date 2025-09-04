import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PieChart } from "react-native-gifted-charts";
import { THEME } from "@/lib/theme";

export function SurahList() {
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  
  const pieData = [
    { value: 25, color: THEME.light.primary, text: '25%' },
    { value: 75, color: THEME.light.secondary, text: '75%' },
  ];
  
  const surahData = [
    { id: 1, name: "الفاتحة", nameTranslit: "Al-Fatihah", meaning: "The Opening", totalVerses: 7 },
    { id: 2, name: "البقرة", nameTranslit: "Al-Baqarah", meaning: "The Cow", totalVerses: 286 },
    { id: 3, name: "آل عمران", nameTranslit: "Ali 'Imran", meaning: "Family of Imran", totalVerses: 200 },
    { id: 4, name: "النساء", nameTranslit: "An-Nisa", meaning: "The Women", totalVerses: 176 },
    { id: 5, name: "المائدة", nameTranslit: "Al-Ma'idah", meaning: "The Table Spread", totalVerses: 120 },
    { id: 6, name: "الأنعام", nameTranslit: "Al-An'am", meaning: "The Cattle", totalVerses: 165 },
    { id: 7, name: "الأعراف", nameTranslit: "Al-A'raf", meaning: "The Heights", totalVerses: 206 },
    { id: 8, name: "الأنفال", nameTranslit: "Al-Anfal", meaning: "The Spoils of War", totalVerses: 75 },
    { id: 9, name: "التوبة", nameTranslit: "At-Taubah", meaning: "The Repentance", totalVerses: 129 },
    { id: 10, name: "يونس", nameTranslit: "Yunus", meaning: "Jonah", totalVerses: 109 },
  ];
  
  const allSurahData = Array.from({length: 114}, (_, index) => {
    if (index < surahData.length) {
      return surahData[index];
    }
    return {
      id: index + 1,
      name: `سورة`,
      nameTranslit: `Surah ${index + 1}`,
      meaning: '-',
      totalVerses: Math.floor(Math.random() * 200) + 1,
    };
  });
  
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
            <View>
              <Text className="font-semibold text-lg">Last Reading</Text>
              <Text className="text-muted-foreground mt-1">Al-Baqarah</Text>
              <Text className="text-muted-foreground">Ayat 255 dari 286</Text>
            </View>
            <View style={{ width: 80, height: 80 }}>
              <PieChart 
                data={pieData}
                donut
                radius={40}
                innerRadius={25}
                centerLabelComponent={() => {
                  return <Text style={{ fontSize: 14, fontWeight: '600' }}>25%</Text>;
                }}
              />
            </View>
          </View>
        </CardContent>
      </Card>

      <View
        style={{ 
          height: height - 200,
          paddingBottom: insets.bottom + 150,
        }}
      >
        <FlashList
          data={allSurahData}
          className="px-4 pt-2"
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
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View className="bg-primary w-10 h-10 rounded-full items-center justify-center mr-3">
                      <Text className="text-primary-foreground font-bold">{item.id}</Text>
                    </View>
                    <View>
                      <Text className="font-semibold">{item.nameTranslit}</Text>
                      <Text className="text-muted-foreground text-sm">{item.meaning}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-primary font-medium">{item.name}</Text>
                    <Text className="font-semibold text-base">{item.totalVerses} Ayat</Text>
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