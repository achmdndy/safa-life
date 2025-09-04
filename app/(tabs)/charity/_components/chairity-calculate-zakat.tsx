import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Calculator, ArrowRight } from "lucide-react-native";
import { View } from "react-native";

export function ChairityCalculateZakat() {
  return (
    <View className="px-4 gap-4 mt-4">
      <Card
        className="border-transparent p-0"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        }}
      >
        <CardContent className="p-6">
          <View className="flex-row items-start gap-4">
            <View className="w-14 h-14 rounded-full bg-gray-200 items-center justify-center">
              <Icon as={Calculator} size={24} className="text-gray-700" />
            </View>
            
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-2">Calculate Your Zakat</Text>
              <Text className="text-gray-600 text-sm leading-5 mb-4">
                Zakat is a mandatory pillar of Islam. Use our calculator to determine your obligation and fulfill it with ease.
              </Text>
              
              <Button>
                <Text className="text-white font-medium mr-2">Calculate & Pay Zakat</Text>
                <Icon as={ArrowRight} size={16} className="text-white" />
              </Button>
            </View>
          </View>
          
          <View className="mt-4 pt-4 border-t border-gray-200">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-xs text-gray-500 uppercase tracking-wide">Quick Facts</Text>
                <Text className="text-sm text-gray-700 mt-1">2.5% of eligible wealth</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 uppercase tracking-wide">Nisab Threshold</Text>
                <Text className="text-sm text-gray-700 mt-1">85g gold equivalent</Text>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  )
}