import { MoonStar, Route } from "lucide-react-native";
import { Image, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

export function ExploreHijrahProgram() {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="mx-4 mt-8 overflow-hidden rounded-xl">
			<View className="relative">
				<Image
					source={{
						uri: "https://images.unsplash.com/photo-1512970648279-ff3398568f77?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					}}
					resizeMode="cover"
					className="w-full h-64"
				/>
				<View className="absolute inset-0 bg-black/50 p-5 flex justify-between">
					<View>
						<View className="flex-row items-center mb-1">
							<Icon as={MoonStar} size={16} className="mr-2 text-white" />
							<Text className="text-white font-medium">Featured</Text>
						</View>

						<Text className="text-white text-2xl font-bold mb-2">
							The Hijrah Program
						</Text>

						<View className="mb-4">
							<Text className="text-white opacity-80 flex-wrap">
								Embark on a transformative journey of faith. Join our guided
								program to strengthen your connection with Allah.
							</Text>
						</View>
					</View>

					<Button
						className="w-48 self-start"
						style={{ backgroundColor: selectedTheme.primary }}
					>
						<Icon as={Route} size={16} className="text-white mr-2" />
						<Text className="text-white font-medium">Start Your Journey</Text>
					</Button>
				</View>
			</View>
		</View>
	);
}
