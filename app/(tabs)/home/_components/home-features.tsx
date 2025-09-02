import { Compass } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export function HomeFeatures() {
	return (
		<View className="px-4 mt-4">
			<View className="flex-row items-center justify-between">
				<Text className="font-semibold text-lg mb-2">Features</Text>
				<Button variant="ghost" size="sm">
					<Text>View More</Text>
				</Button>
			</View>

			<View className="flex-row items-center justify-between mt-2">
				<View 
					className="w-1/5 items-center bg-card p-2 rounded-lg"
				>
					<Compass width={25} height={25} />
					<Text className="mt-2 text-muted-foreground font-semibold">Qibla</Text>
				</View>
				<View 
					className="w-1/5 items-center bg-card p-2 rounded-lg"
				>
					<Compass width={25} height={25} />
					<Text className="mt-2 text-muted-foreground font-semibold">Qibla</Text>
				</View>
				<View 
					className="w-1/5 items-center bg-card p-2 rounded-lg"
				>
					<Compass width={25} height={25} />
					<Text className="mt-2 text-muted-foreground font-semibold">Qibla</Text>
				</View>
				<View 
					className="w-1/5 items-center bg-card p-2 rounded-lg"
				>
					<Compass width={25} height={25} />
					<Text className="mt-2 text-muted-foreground font-semibold">Qibla</Text>
				</View>
				<View 
					className="w-1/5 items-center bg-card p-2 rounded-lg"
				>
					<Compass width={25} height={25} />
					<Text className="mt-2 text-muted-foreground font-semibold">Qibla</Text>
				</View>
			</View>
		</View>
	);
}
