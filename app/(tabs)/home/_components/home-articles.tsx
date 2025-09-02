import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";

export function HomeArticles() {
	return (
		<View className="px-4 mt-4">
			<View className="flex-row items-center justify-between">
				<Text className="font-semibold text-lg mb-2">Latest Articles</Text>
				<Button variant="ghost" size="sm">
					<Text>View More</Text>
				</Button>
			</View>

			<View className="mt-2 gap-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Card
						key={index.toString()}
						className="border-transparent p-4 flex-row gap-2 items-center"
						style={{
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 0.1,
							shadowRadius: 4,
						}}
					>
						<Skeleton className="w-20 h-20 bg-gray-300" />
						<View className="gap-2">
							<View className="gap-1">
								<Skeleton className="w-60 h-5 bg-gray-300 rounded" />
								<Skeleton className="w-40 h-5 bg-gray-300 rounded" />
							</View>
							<Skeleton className="w-20 h-4 bg-gray-300 rounded" />
						</View>
					</Card>
				))}
			</View>
		</View>
	);
}
