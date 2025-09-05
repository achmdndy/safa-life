import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";
import { Calculator, ArrowRight } from "lucide-react-native";
import { View } from "react-native";

export function ChairityCalculateZakat() {
  const { currentTheme, themes } = useTheme();
  const selectedTheme = themes[currentTheme];

  return (
    <View className="px-4 gap-4 mt-8">
      <Card
        className="border-transparent p-0"
        style={{
          shadowColor: selectedTheme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        }}
      >
        <CardContent className="p-6">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-2">
              <Icon as={Calculator} size={24} stroke={selectedTheme.primary} />
              <Text className="text-xl font-bold text-gray-900 dark:text-foreground">Calculate Your Zakat</Text>
            </View>
            <Text className="text-gray-600 dark:text-foreground/90 text-sm leading-5 mb-4">
              Zakat is a mandatory pillar of Islam. Use our calculator to determine your obligation and fulfill it with ease.
            </Text>
            
            <Button style={{backgroundColor: selectedTheme.primary}}>
              <Text className="text-white font-medium mr-2">Calculate & Pay Zakat</Text>
              <Icon as={ArrowRight} size={16} className="text-white" />
            </Button>
          </View>
          
          <View className="mt-4 pt-4 border-t border-gray-200">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-xs text-gray-500 dark:text-foreground/50 uppercase tracking-wide">Quick Facts</Text>
                <Text className="text-xs text-gray-700 dark:text-foreground/70 mt-1">2.5% of eligible wealth</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 dark:text-foreground/50 uppercase tracking-wide">Nisab Threshold</Text>
                <Text className="text-xs text-gray-700 dark:text-foreground/70 mt-1">85g gold equivalent</Text>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  )
}