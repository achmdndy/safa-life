import { Home } from "lucide-react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

export function HomeFeatureCard() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<Card
			className="p-4 border-transparent w-[48%]"
			style={{
				shadowColor: selectedTheme.primary,
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.1,
				shadowRadius: 4,
			}}
		>
			<CardContent className="p-0 flex-row items-center justify-between gap-2">
				<Text
					className="flex-1 text-lg font-semibold leading-tight"
					numberOfLines={2}
				>
					Lorem, ipsum dolor.
				</Text>
				<Icon as={Home} size={32} stroke={selectedTheme.primary} />
			</CardContent>
		</Card>
	);
}
