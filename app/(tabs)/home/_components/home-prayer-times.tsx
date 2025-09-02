import { View } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

export function HomePrayerTimes() {
	return (
		<View className="px-4 mt-4">
			<Text className="font-semibold text-lg mb-2">
				Today's Prayer Schedule
			</Text>

			<Card
				className="p-4 border-transparent"
				style={{
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 0 },
					shadowOpacity: 0.1,
					shadowRadius: 10,
				}}
			>
				<CardContent className="p-0">
					<View className="flex-row items-center justify-between">
						<View>
							<Text className="text-lg font-semibold">Fajr</Text>
							<Text className="text-muted-foreground">
								Upcoming in 23 minutes
							</Text>
						</View>

						<Text className="text-2xl font-bold text-destructive">04:35</Text>
					</View>
					<Separator className="my-4" />
					<View className="flex-row items-center">
						<View className="w-1/5 items-center">
							<Text className="text-muted-foreground">Fajr</Text>
							<Text className="font-semibold">04:35</Text>
						</View>
						<View className="w-1/5 items-center">
							<Text className="text-muted-foreground">Dhuhr</Text>
							<Text className="font-semibold">04:35</Text>
						</View>
						<View className="w-1/5 items-center">
							<Text className="text-muted-foreground">Asr</Text>
							<Text className="font-semibold">04:35</Text>
						</View>
						<View className="w-1/5 items-center">
							<Text className="text-muted-foreground">Maghrib</Text>
							<Text className="font-semibold">04:35</Text>
						</View>
						<View className="w-1/5 items-center">
							<Text className="text-muted-foreground">Isha</Text>
							<Text className="font-semibold">04:35</Text>
						</View>
					</View>
				</CardContent>
			</Card>
		</View>
	);
}
