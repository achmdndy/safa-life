import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";
import { Search, Bell } from "lucide-react-native";
import type { ComponentProps } from "react";
import { Animated, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CHARITY_HEADER_MAX_HEIGHT, CHARITY_HEADER_MIN_HEIGHT, CHARITY_SCROLL_DISTANCE } from "..";

export type ChairityHeaderProps = ComponentProps<typeof View> & {
	value: Animated.Value;
};

export function ChairityHeader({ value }: ChairityHeaderProps) {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];
	const insets = useSafeAreaInsets();

	const animatedHeaderHeight = value.interpolate({
		inputRange: [0, CHARITY_SCROLL_DISTANCE],
		outputRange: [CHARITY_HEADER_MAX_HEIGHT, CHARITY_HEADER_MIN_HEIGHT],
		extrapolate: "clamp",
	});

	const animatedOpacity = value.interpolate({
		inputRange: [0, CHARITY_SCROLL_DISTANCE],
		outputRange: [1, 0],
		extrapolate: "clamp",
	});

	const animatedHeight = value.interpolate({
		inputRange: [0, CHARITY_SCROLL_DISTANCE],
		outputRange: [60, 0],
		extrapolate: "clamp",
	});
	
  const animatedMarginBottom = value.interpolate({
		inputRange: [0, CHARITY_SCROLL_DISTANCE],
		outputRange: [16, 0],
		extrapolate: "clamp",
	});

	const animatedTranslateY = value.interpolate({
		inputRange: [0, CHARITY_SCROLL_DISTANCE],
		outputRange: [0, -100],
		extrapolate: "clamp",
	});

	return (
		<Animated.View 
			className="px-4 pb-4 bg-background" 
			style={{
				paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 20,
				height: animatedHeaderHeight,
			}}
		>
			<Animated.View 
				className="flex-row items-center justify-between"
				style={{
					opacity: animatedOpacity,
					height: animatedHeight,
					marginBottom: animatedMarginBottom,
					transform: [{ translateY: animatedTranslateY }],
				}}
			>
				<View>
					<Text className="text-2xl font-bold" style={{color: selectedTheme.primary}}>Charity</Text>
					<Text className="text-primary/80 text-sm">Make a difference today</Text>
				</View>
				
				<Button 
					size="icon" 
					variant="ghost" 
					className="rounded-full"
					style={{backgroundColor: selectedTheme.secondary + '20'}}
				>
					<Icon as={Bell} size={20} stroke={selectedTheme.primary} />
				</Button>
			</Animated.View>
			
			<Button 
				className="rounded-full justify-start w-full" 
				variant="outline"
			>
				<Icon as={Search} size={20} className="mr-2" stroke={selectedTheme.primary} />
				<Text className="text-gray-600 flex-1 text-left">Search charities, causes...</Text>
			</Button>
		</Animated.View>
	);
}