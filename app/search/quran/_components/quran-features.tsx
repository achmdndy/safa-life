import { Star } from "lucide-react-native";
import { View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import QuranContentCard from "./quran-content-card";

export const features = [
	{
		title: "Allah's Great Signs",
		slug: "allah-signs",
	},
	{
		title: "Rewards for Believers",
		slug: "rewards-believers",
	},
	{
		title: "Stories of Prophets",
		slug: "prophet-stories",
	},
	{
		title: "Divine Guidance",
		slug: "divine-guidance",
	},
	{
		title: "Paradise & Hell",
		slug: "paradise-hell",
	},
	{
		title: "Moral Teachings",
		slug: "moral-teachings",
	},
	{
		title: "Prayer & Worship",
		slug: "prayer-worship",
	},
	{
		title: "Charity & Giving",
		slug: "charity-giving",
	},
];

export default function QuranFeatures() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<View className="gap-2">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Star}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">Discover Quran</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-start gap-2 px-4 py-2">
				{features.map((item) => (
					<QuranContentCard key={item.slug} title={item.title} />
				))}
			</View>
		</View>
	);
}
