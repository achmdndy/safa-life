import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { THEME } from "@/lib/theme";
import { FlashList } from "@shopify/flash-list";
import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function JuzList() {
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  
  const pieData = [
    { value: 10, color: THEME.light.primary, text: '10%' },
    { value: 90, color: THEME.light.secondary, text: '90%' },
  ];
  
  const juzData = Array.from({length: 30}, (_, index) => {
    const juzInfo = {
      1: { startSurah: "Al-Fatihah", endSurah: "Al-Baqarah", startAyat: 1, endAyat: 141 },
      2: { startSurah: "Al-Baqarah", endSurah: "Al-Baqarah", startAyat: 142, endAyat: 252 },
      3: { startSurah: "Al-Baqarah", endSurah: "Ali 'Imran", startAyat: 253, endAyat: 92 },
      4: { startSurah: "Ali 'Imran", endSurah: "An-Nisa", startAyat: 93, endAyat: 23 },
      5: { startSurah: "An-Nisa", endSurah: "An-Nisa", startAyat: 24, endAyat: 147 },
    };
    
    const juzNumber = index + 1;
    const info = juzInfo[juzNumber] || { 
      startSurah: "Surah X", 
      endSurah: "Surah Y", 
      startAyat: 1, 
      endAyat: 20 
    };
    
    return {
      id: juzNumber,
      name: `Juz ${juzNumber}`,
      startSurah: info.startSurah,
      endSurah: info.endSurah,
      startAyat: info.startAyat,
      endAyat: info.endAyat,
      progress: Math.floor(Math.random() * 100),
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
          <View className="flex-row items-center gap-4">
            <View style={{ width: 80, height: 80 }}>
              <PieChart 
                data={pieData}
                donut
                radius={40}
                innerRadius={25}
                centerLabelComponent={() => {
                  return <Text style={{ fontSize: 14, fontWeight: '600' }}>10%</Text>;
                }}
              />
            </View>
            <View>
              <Text className="font-semibold text-lg">Progress Khatam</Text>
              <Text className="text-muted-foreground mt-1">3 of 30 Juz</Text>
              <Text className="text-muted-foreground">Last: Juz 3 (Ali 'Imran)</Text>
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
          data={juzData}
          className="px-4 pt-2"
          scrollEventThrottle={16}
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
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View className="bg-primary w-10 h-10 rounded-full items-center justify-center mr-3">
                      <Text className="text-primary-foreground font-bold">{item.id}</Text>
                    </View>
                    <View>
                      <Text className="font-semibold">{item.name}</Text>
                      <Text className="text-muted-foreground text-sm">
                        {item.startSurah}{item.startSurah !== item.endSurah ? ` - ${item.endSurah}` : ''}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-muted-foreground">{item.progress}%</Text>
                    <View 
                      className="bg-gray-200 w-16 h-1 mt-1 rounded-full overflow-hidden"
                    >
                      <View 
                        className="bg-primary h-full rounded-full" 
                        style={{ width: `${item.progress}%` }} 
                      />
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
  )
}