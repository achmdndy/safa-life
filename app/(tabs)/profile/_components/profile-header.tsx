import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Pen } from "lucide-react-native";
import type { ComponentProps } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/theme-context";
import { PROFILE_HEADER_MAX_HEIGHT, PROFILE_HEADER_MIN_HEIGHT, PROFILE_SCROLL_DISTANCE } from "..";

export type ProfileHeaderProps = ComponentProps<typeof View> & {
	value: Animated.Value;
};

export function ProfileHeader({ value }: ProfileHeaderProps) {
  const { currentTheme, themes } = useTheme();
  const selectedTheme = themes[currentTheme];
  const insets = useSafeAreaInsets();

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, PROFILE_SCROLL_DISTANCE],
    outputRange: [PROFILE_HEADER_MAX_HEIGHT, PROFILE_HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const animatedAvatarOpacity = value.interpolate({
    inputRange: [0, PROFILE_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const animatedAvatarHeight = value.interpolate({
    inputRange: [0, PROFILE_SCROLL_DISTANCE],
    outputRange: [110, 0],
    extrapolate: "clamp",
  });

  const animatedMarginBottom = value.interpolate({
		inputRange: [0, PROFILE_SCROLL_DISTANCE],
		outputRange: [16, 0],
		extrapolate: "clamp",
	});

  const animatedAvatarTranslateY = value.interpolate({
    inputRange: [0, PROFILE_SCROLL_DISTANCE],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  return (
    <Animated.View 
      className="px-4 pb-6 bg-card rounded-b-3xl items-center justify-center" 
      style={{
        paddingTop: insets.top + 20,
        height: animatedHeaderHeight,
        shadowColor: selectedTheme.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 10
      }}
    >
      <Animated.View 
        className="relative mb-4"
        style={{
          opacity: animatedAvatarOpacity,
          height: animatedAvatarHeight,
          marginBottom: animatedMarginBottom,
          transform: [{ translateY: animatedAvatarTranslateY }],
        }}
      >
        <Avatar alt="User Image" className="w-28 h-28 border-4 border-gray-100">
          <AvatarImage 
            source={{ uri: 'https://images.unsplash.com/photo-1651862224352-47dffe59ed79?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG11c2xpbSUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D' }}
            className="w-full h-full"
          />
          <AvatarFallback className="bg-gray-300">
            <Text className="text-gray-600 text-2xl font-bold">AD</Text>
          </AvatarFallback>
        </Avatar>
        <View className="absolute bottom-0 right-0 bg-background rounded-full p-2 border-2 border-gray-100">
          <Icon as={Pen} size={14} className="text-primary"/>
        </View>
      </Animated.View>
      
      <View className="items-center space-y-1">
        <Text className="text-primary text-xl font-bold">Achmad Andy Dekanovy</Text>
        <Text className="text-primary/80 text-sm">achmdndy@gmail.com</Text>
      </View>
    </Animated.View>
  )
}