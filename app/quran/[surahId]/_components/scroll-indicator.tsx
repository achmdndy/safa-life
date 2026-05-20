import { Text, View } from "react-native";

interface ScrollIndicatorProps {
	text: string;
}

export default function ScrollIndicator({ text }: ScrollIndicatorProps) {
	return (
		<View className="h-20 items-center justify-center">
			<Text className="text-base text-gray-500">{text}</Text>
		</View>
	);
}
