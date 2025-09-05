import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ChevronLeft } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

export function ThemeHeader() {
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View 
      style={{ paddingTop: insets.top + 10 }} 
      className="px-4 pb-4 bg-background"
    >
      <View className="flex-row items-center justify-between">
        <Button  onPress={handleGoBack} variant="ghost" size="icon">
          <Icon as={ChevronLeft} size={20} className="text-foreground" />
        </Button>

        <View className="flex-1 flex-row items-center justify-center">
          <Text className="text-xl font-bold text-foreground">
            Theme Settings
          </Text>
        </View>

        <View className="w-10" />
      </View>
    </View>
  );
}