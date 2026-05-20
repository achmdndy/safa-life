import { Pressable } from "react-native";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";

export default function QuranContentCard({ title }: { title: string }) {
	return (
		<Pressable>
			<Badge className="h-10 px-4 rounded-full" variant="outline">
				<Text>{title}</Text>
			</Badge>
		</Pressable>
	);
}
