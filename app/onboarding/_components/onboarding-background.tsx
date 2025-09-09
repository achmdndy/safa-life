import { MeshGradientView } from "expo-mesh-gradient";
import { StyleSheet } from "react-native";
import { themes, useTheme } from "@/contexts/theme-context";

export function OnboardingBackground() {
	const { currentTheme, theme } = useTheme();
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];

	const getThemeColors = () => {
		const primary = selectedTheme.primary;
		const secondary = selectedTheme.secondary;

		if (isDarkMode) {
			return [primary, "#000000", secondary, "#1a1a1a"];
		} else {
			return ["#FFFFFF", `${primary}AA`, `${secondary}BB`, "#F5F5F5"];
		}
	};

	return (
		<MeshGradientView
			style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
			columns={2}
			rows={2}
			colors={getThemeColors()}
			points={[
				[0.0, 0.0],
				[1.0, 0.0],
				[0.0, 1.0],
				[1.0, 1.0],
			]}
		/>
	);
}
