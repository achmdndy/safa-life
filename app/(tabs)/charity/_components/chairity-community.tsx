import { ChevronRight, Clock, Heart, Target, Users } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

const communityData = [
	{
		id: 1,
		category: "Education",
		title: "Build Islamic School in Rural Area",
		description:
			"Help us build a new Islamic school to provide quality education for 500+ children in underserved communities.",
		raised: 75000,
		target: 100000,
		donors: 234,
		daysLeft: 15,
		urgent: true,
		image:
			"https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
		location: "Rural Indonesia",
	},
	{
		id: 2,
		category: "Healthcare",
		title: "Medical Aid for Gaza Children",
		description:
			"Provide essential medical supplies and treatment for children affected by the ongoing Crisis.",
		raised: 45000,
		target: 80000,
		donors: 189,
		daysLeft: 8,
		urgent: true,
		image:
			"https://images.unsplash.com/photo-1571620874594-d6df8b47f708?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzbGltfGVufDB8fDB8fHww",
		location: "Gaza, Palestine",
	},
	{
		id: 3,
		category: "Water",
		title: "Clean Water Wells Project",
		description:
			"Install water wells in drought-affected areas to provide clean drinking water for entire villages.",
		raised: 32000,
		target: 60000,
		donors: 156,
		daysLeft: 22,
		urgent: false,
		image:
			"https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzbGltfGVufDB8fDB8fHww",
		location: "Somalia, Africa",
	},
	{
		id: 4,
		category: "Food",
		title: "Ramadan Food Packages",
		description:
			"Distribute nutritious food packages to families in need during the holy month of Ramadan.",
		raised: 18000,
		target: 25000,
		donors: 98,
		daysLeft: 5,
		urgent: true,
		image:
			"https://images.unsplash.com/photo-1605976528013-638e49b6599f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D",
		location: "Syria & Yemen",
	},
	{
		id: 5,
		category: "Orphans",
		title: "Support Orphan Children",
		description:
			"Provide monthly support, education, and care for orphaned children in need.",
		raised: 28000,
		target: 50000,
		donors: 142,
		daysLeft: 12,
		urgent: false,
		image:
			"https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzbGltfGVufDB8fDB8fHwy",
		location: "Bangladesh",
	},
	{
		id: 6,
		category: "Emergency",
		title: "Earthquake Relief Fund",
		description:
			"Emergency aid for families affected by recent earthquakes, providing shelter and basic necessities.",
		raised: 65000,
		target: 120000,
		donors: 298,
		daysLeft: 3,
		urgent: true,
		image:
			"https://images.unsplash.com/photo-1616518883324-d7f5f1ce7e99?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fG11c2xpbXxlbnwwfHwwfHx8Mg%3D%3D",
		location: "Turkey & Syria",
	},
];

export function ChairityCommunity() {
	const { currentTheme, themes, theme } = useTheme();
	const selectedTheme = themes[currentTheme];
	const isDarkMode = theme === "dark";

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<View className="px-4 gap-4 mt-8">
			<View className="flex-row justify-between items-center">
				<View className="flex-row items-center">
					<Icon
						as={Heart}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Community Causes</Text>
				</View>
				<Pressable className="flex-row items-center">
					<Text className="text-sm mr-1">View all</Text>
					<Icon as={ChevronRight} size={16} />
				</Pressable>
			</View>

			<View className="gap-4">
				{communityData.map((cause) => {
					const progressPercentage = (cause.raised / cause.target) * 100;

					return (
						<Card
							key={cause.id}
							className="border-transparent p-4 gap-1"
							style={{
								shadowColor: selectedTheme.primary,
								shadowOffset: { width: 0, height: 4 },
								shadowOpacity: 0.1,
								shadowRadius: 8,
							}}
						>
							<CardContent className="p-0">
								<AspectRatio ratio={16 / 9}>
									<View className="relative rounded-lg overflow-hidden">
										<Image
											source={{ uri: cause.image }}
											style={{ width: "100%", height: "100%" }}
											resizeMode="cover"
										/>
										{cause.urgent && (
											<View className="absolute top-3 left-3">
												<Badge className="bg-red-500 text-white px-2 py-1">
													<Text className="text-xs font-medium">URGENT</Text>
												</Badge>
											</View>
										)}
										<View className="absolute top-3 right-3">
											<Badge className="bg-black/70 text-white px-2 py-1">
												<Text className="text-xs">{cause.category}</Text>
											</Badge>
										</View>
									</View>
								</AspectRatio>

								<View className="pt-4">
									<Text className="text-lg font-bold text-gray-900 dark:text-foreground mb-2 leading-6">
										{cause.title}
									</Text>
									<Text className="text-sm text-gray-600 dark:text-foreground/90 mb-4 leading-5">
										{cause.description}
									</Text>

									<View className="mb-4">
										<View className="flex-row justify-between items-center mb-3">
											<View className="flex-1">
												<Text
													className="text-lg font-bold"
													style={{ color: selectedTheme.secondary }}
												>
													{formatCurrency(cause.raised)}
												</Text>
												<Text className="text-xs text-gray-500">
													raised so far
												</Text>
											</View>
											<View className="items-end">
												<Text className="text-sm font-semibold text-gray-700 dark:text-foreground">
													{Math.round(progressPercentage)}%
												</Text>
												<Text className="text-xs text-gray-500 dark:text-foreground/90">
													of {formatCurrency(cause.target)}
												</Text>
											</View>
										</View>
										<Progress
											value={progressPercentage}
											className="h-3 rounded-full"
											style={{
												backgroundColor: `${selectedTheme.secondary}20`,
											}}
											indicatorStyle={{
												backgroundColor: selectedTheme.primary,
											}}
										/>
									</View>

									<View className="flex-row justify-between mb-3">
										<View
											className="flex-1 rounded-lg p-2 mr-1"
											style={{ backgroundColor: `${selectedTheme.primary}10` }}
										>
											<View className="flex-row items-center mb-1">
												<View
													className="w-6 h-6 rounded-full items-center justify-center mr-1"
													style={{
														backgroundColor: `${selectedTheme.secondary}20`,
													}}
												>
													<Icon
														as={Users}
														size={12}
														stroke={selectedTheme.primary}
													/>
												</View>
												<Text
													className="text-xs text-gray-500 dark:text-foreground/80 flex-1"
													numberOfLines={1}
												>
													Donors
												</Text>
											</View>
											<Text
												className="text-sm font-bold"
												style={{ color: selectedTheme.secondary }}
												numberOfLines={1}
											>
												{cause.donors}
											</Text>
										</View>

										<View
											className="flex-1 rounded-lg p-2 mx-0.5"
											style={{
												backgroundColor: isDarkMode
													? `${selectedTheme.primary}10`
													: cause.daysLeft <= 7
														? "#FEF3C7"
														: "#F3F4F6",
											}}
										>
											<View className="flex-row items-center mb-1">
												<View
													className="w-6 h-6 rounded-full items-center justify-center mr-1"
													style={{
														backgroundColor:
															cause.daysLeft <= 7 ? "#F59E0B20" : "#6B728020",
													}}
												>
													<Icon
														as={Clock}
														size={12}
														stroke={cause.daysLeft <= 7 ? "#F59E0B" : "#6B7280"}
													/>
												</View>
												<Text
													className="text-xs text-gray-500 dark:text-foreground/80 flex-1"
													numberOfLines={1}
												>
													Days
												</Text>
											</View>
											<Text
												className="text-sm font-bold"
												style={{
													color: cause.daysLeft <= 7 ? "#F59E0B" : "#6B7280",
												}}
												numberOfLines={1}
											>
												{cause.daysLeft}
											</Text>
										</View>

										<View
											className="flex-1 rounded-lg p-2 ml-1"
											style={{
												backgroundColor: isDarkMode
													? `${selectedTheme.primary}10`
													: "#ECFDF5",
											}}
										>
											<View className="flex-row items-center mb-1">
												<View
													className="w-6 h-6 rounded-full items-center justify-center mr-1"
													style={{ backgroundColor: "#10B98120" }}
												>
													<Icon as={Target} size={12} stroke={"#10B981"} />
												</View>
												<Text
													className="text-xs text-gray-500 dark:text-foreground/80 flex-1"
													numberOfLines={1}
												>
													Goal
												</Text>
											</View>
											<Text
												className="text-xs font-bold text-green-600"
												numberOfLines={1}
											>
												{formatCurrency(cause.target / 1000)}K
											</Text>
										</View>
									</View>
								</View>
							</CardContent>

							<CardFooter className="p-0">
								<Button
									className="w-full rounded-lg py-3"
									size="lg"
									style={{
										backgroundColor: selectedTheme.primary,
									}}
								>
									<Text className="text-white font-semibold">Donate Now</Text>
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</View>
		</View>
	);
}
