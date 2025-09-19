import { AlertTriangle, Clock, TrendingUp } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

const urgentCauses = [
	{
		id: 1,
		title: "Gaza Emergency Relief",
		raised: 45000,
		target: 80000,
		daysLeft: 3,
		image:
			"https://images.unsplash.com/photo-1571620874594-d6df8b47f708?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzbGltfGVufDB8fDB8fHww",
	},
	{
		id: 2,
		title: "Flood Relief Indonesia",
		raised: 32000,
		target: 50000,
		daysLeft: 7,
		image:
			"https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
	},
];

const topCauses = [
	{
		id: 3,
		title: "Build Mosque in Rural Area",
		raised: 75000,
		target: 100000,
		donors: 234,
	},
	{
		id: 4,
		title: "Clean Water Wells Project",
		raised: 28000,
		target: 40000,
		donors: 156,
	},
];

export function CharityCommunity() {
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<View className="px-4 gap-4 mt-4">
			<View className="gap-4">
				<View className="flex-row justify-between items-center">
					<View className="flex-row items-center">
						<Icon
							as={AlertTriangle}
							size={18}
							className="mr-2"
							stroke={selectedTheme.primary}
						/>
						<Text className="font-bold text-xl">Urgent Causes</Text>
					</View>
				</View>

				<View className="gap-3">
					{urgentCauses.map((cause) => {
						const progressPercentage = (cause.raised / cause.target) * 100;

						return (
							<Pressable key={cause.id}>
								<Card
									className="border-transparent p-3"
									style={{
										shadowColor: "#EF4444",
										shadowOffset: { width: 0, height: 2 },
										shadowOpacity: 0.1,
										shadowRadius: 4,
									}}
								>
									<CardContent className="p-0">
										<View className="flex-row gap-3">
											<AspectRatio ratio={1} className="w-16">
												<View className="relative rounded-lg overflow-hidden">
													<Image
														source={{ uri: cause.image }}
														style={{ width: "100%", height: "100%" }}
														resizeMode="cover"
													/>
													<View className="absolute top-1 right-1">
														<Badge className="bg-red-500 text-white px-1 py-0.5">
															<Text className="text-xs font-medium">
																URGENT
															</Text>
														</Badge>
													</View>
												</View>
											</AspectRatio>

											<View className="flex-1">
												<Text className="text-sm font-semibold text-gray-900 dark:text-foreground mb-1">
													{cause.title}
												</Text>
												<View className="flex-row items-center mb-2">
													<Icon as={Clock} size={12} stroke="#F59E0B" />
													<Text className="text-xs text-orange-600 ml-1">
														{cause.daysLeft} days left
													</Text>
												</View>
												<Progress
													value={progressPercentage}
													className="h-2 rounded-full mb-1"
													style={{
														backgroundColor: "#FEE2E2",
													}}
													indicatorStyle={{
														backgroundColor: "#EF4444",
													}}
												/>
												<Text className="text-xs text-gray-600 dark:text-foreground/80">
													{formatCurrency(cause.raised)} of{" "}
													{formatCurrency(cause.target)}
												</Text>
											</View>
										</View>
									</CardContent>
								</Card>
							</Pressable>
						);
					})}
				</View>
			</View>

			<View className="gap-4">
				<View className="flex-row justify-between items-center">
					<View className="flex-row items-center">
						<Icon
							as={TrendingUp}
							size={18}
							className="mr-2"
							stroke={selectedTheme.primary}
						/>
						<Text className="font-bold text-xl">Top Community Causes</Text>
					</View>
				</View>

				<View className="gap-3">
					{topCauses.map((cause) => {
						const progressPercentage = (cause.raised / cause.target) * 100;

						return (
							<Pressable key={cause.id}>
								<Card
									className="border-transparent p-3"
									style={{
										shadowColor: selectedTheme.primary,
										shadowOffset: { width: 0, height: 2 },
										shadowOpacity: 0.1,
										shadowRadius: 4,
									}}
								>
									<CardContent className="p-0">
										<View className="flex-row justify-between items-start mb-2">
											<Text className="text-sm font-semibold text-gray-900 dark:text-foreground flex-1 mr-2">
												{cause.title}
											</Text>
											<Text
												className="text-xs font-bold"
												style={{ color: selectedTheme.primary }}
											>
												{Math.round(progressPercentage)}%
											</Text>
										</View>
										<Progress
											value={progressPercentage}
											className="h-2 rounded-full mb-2"
											style={{
												backgroundColor: `${selectedTheme.secondary}20`,
											}}
											indicatorStyle={{
												backgroundColor: selectedTheme.primary,
											}}
										/>
										<View className="flex-row justify-between items-center">
											<Text className="text-xs text-gray-600 dark:text-foreground/80">
												{formatCurrency(cause.raised)} raised
											</Text>
											<Text className="text-xs text-gray-500 dark:text-foreground/70">
												{cause.donors} donors
											</Text>
										</View>
									</CardContent>
								</Card>
							</Pressable>
						);
					})}
				</View>
			</View>
		</View>
	);
}
