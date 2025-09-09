import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeDarkMode } from "./_components/theme-dark-mode";
import { ThemeHeader } from "./_components/theme-header";
import { ThemeList } from "./_components/theme-list";

export default function ThemeScreen() {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-background h-full">
			<ThemeHeader />
			<ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}>
				<ThemeDarkMode />
				<ThemeList />
			</ScrollView>
		</View>
	);
}
