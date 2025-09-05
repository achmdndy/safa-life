import { Text } from "@/components/ui/text";
import { View, Pressable, ScrollView } from "react-native";
import { useTheme, themes } from "@/contexts/theme-context";
import { Icon } from "@/components/ui/icon";
import { Check, Palette } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeHeader } from "./_components/theme-header";
import { ThemeDarkMode } from "./_components/theme-dark-mode";
import { ThemeList } from "./_components/theme-list";

export default function ThemeScreen() {
  const { currentTheme, setTheme, themes: themeOptions } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background h-full">
      <ThemeHeader/>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}
      >
        <ThemeDarkMode />
        <ThemeList />
      </ScrollView>
    </View>
  );
}