import { Icon } from "@/components/ui/icon";
import { themes, useTheme } from "@/contexts/theme-context";
import { Check, Palette } from "lucide-react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

export function ThemeList() {
  const { currentTheme, setTheme, themes: themeOptions } = useTheme();
	const selectedTheme = themes[currentTheme];

  return (
    <View className="px-4">
      <View className="mb-4">
        <View className="flex-row items-center mb-1">
          <Icon as={Palette} size={20} className="text-primary mr-3" />
          <Text className="text-xl font-bold text-foreground">Choose Theme</Text>
        </View>
        <Text className="text-muted-foreground">
          Select your preferred color scheme for the app
        </Text>
      </View>

      <View className="">
        {Object.entries(themeOptions).map(([key, theme]) => {
          const isSelected = currentTheme === key;
          
          return (
            <Pressable
              key={key}
              onPress={() => setTheme(key as any)}
              className="mb-2 p-4 rounded-2xl bg-card"
              android_ripple={{ color: theme.secondary + '40' }}
              style={{
                shadowColor: theme.primary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                   <View className="flex-row mr-5">
                    <View 
                      className="w-10 h-10 rounded-2xl border-3 border-white shadow-sm"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <View 
                      className="w-10 h-10 rounded-2xl border-3 border-white shadow-sm -ml-3"
                      style={{ backgroundColor: theme.secondary }}
                    />
                  </View>
                  
                  <Text className="text-lg font-bold text-foreground">
                    {theme.name}
                  </Text>    
                </View>

                {isSelected && (
                  <View 
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Icon as={Check} size={16} className="text-white" />
                  </View>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  )
}