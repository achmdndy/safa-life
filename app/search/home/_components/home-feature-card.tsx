import { Link } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import type { ComponentProps } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { themes, useTheme } from "@/contexts/theme-context";

export type HomeFeatureCardProps = ComponentProps<typeof Card> & {
	href: string;
	title: string;
	icon: LucideIcon;
};

export function HomeFeatureCard({ href, title, icon }: HomeFeatureCardProps) {
	const { currentTheme } = useTheme();
	const selectedTheme = themes[currentTheme];

	return (
		<Link className="w-[48%]" href={href}>
			<Card
				className="p-4 border-transparent w-full"
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
						{title}
					</Text>
					<Icon as={icon} size={32} stroke={selectedTheme.primary} />
				</CardContent>
			</Card>
		</Link>
	);
}
