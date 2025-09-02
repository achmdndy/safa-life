import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
	return (
		<View className="px-4">
			<Text>HomeScreen</Text>
			<Button>
				<Text>Oke</Text>
			</Button>
			<Card className="border-none">
				<CardTitle>Title</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nisi facere repudiandae facilis consequatur veniam incidunt amet alias. Voluptatibus saepe, nesciunt distinctio suscipit id explicabo repudiandae pariatur nemo eos, quaerat vel doloremque et consectetur dicta non sequi quam? Magnam commodi aliquid quasi assumenda, dicta ea sit nemo eaque ad delectus et sapiente voluptas sequi placeat distinctio? A aut odio illum fugit cum voluptate distinctio dolorem, repellendus hic porro deserunt numquam, minima iusto. Ipsa ipsum quibusdam, velit architecto nisi accusamus hic facere, debitis, tenetur fugit libero provident optio veritatis dolorem itaque aliquam! Magnam error perferendis explicabo dicta itaque sequi nisi ducimus.
        </CardDescription>
			</Card>
		</View>
	);
}
