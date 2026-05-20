import { Heart } from "lucide-react-native";
import { useMemo } from "react";
import { View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";
import QuranContentCard from "./quran-content-card";

export const feels = [
	{ title: "Happy", slug: "happy" },
	{ title: "Sad", slug: "sad" },
	{ title: "Angry", slug: "angry" },
	{ title: "Afraid", slug: "afraid" },
	{ title: "Anxious", slug: "anxious" },
	{ title: "Joyful", slug: "joyful" },
	{ title: "Disappointed", slug: "disappointed" },
	{ title: "Confused", slug: "confused" },
	{ title: "Tired", slug: "tired" },
	{ title: "Stressed", slug: "stressed" },
	{ title: "Calm", slug: "calm" },
	{ title: "Grateful", slug: "grateful" },
	{ title: "Hopeless", slug: "hopeless" },
	{ title: "Optimistic", slug: "optimistic" },
	{ title: "Restless", slug: "restless" },
	{ title: "Peaceful", slug: "peaceful" },
	{ title: "Ashamed", slug: "ashamed" },
	{ title: "Proud", slug: "proud" },
	{ title: "Envious", slug: "envious" },
	{ title: "Patient", slug: "patient" },
	{ title: "Longing", slug: "longing" },
	{ title: "Thankful", slug: "thankful" },
	{ title: "Worried", slug: "worried" },
	{ title: "Enthusiastic", slug: "enthusiastic" },
];

export default function QuranFeels() {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	const randomFeels = useMemo(() => {
		const shuffled = [...feels].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 6);
	}, []);

	return (
		<View className="gap-2 mt-4">
			<View className="flex-row justify-between items-center mx-4">
				<View className="flex-row items-center">
					<Icon
						as={Heart}
						size={20}
						className="mr-2"
						stroke={selectedTheme.primary}
					/>
					<Text className="font-bold text-xl">How are you feeling?</Text>
				</View>
			</View>

			<View className="flex-row flex-wrap justify-start gap-2 px-4 py-2">
				{randomFeels.map((item) => (
					<QuranContentCard key={item.slug} title={item.title} />
				))}
			</View>
		</View>
	);
}
