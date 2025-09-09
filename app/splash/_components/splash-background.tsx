import { MeshGradientView } from "expo-mesh-gradient";
import { themes, useTheme } from "@/contexts/theme-context";

export function SplashBackground() {
	const { currentTheme, theme } = useTheme();
	const isDarkMode = theme === "dark";
	const selectedTheme = themes[currentTheme];

	const getThemeColors = () => {
		const primary = selectedTheme.primary;
		const secondary = selectedTheme.secondary;

		if (isDarkMode) {
			return [
				primary,
				secondary,
				`${primary}DD`,
				`${secondary}BB`,
				"#000000",
				"#111111",
				"#1a1a1a",
				`${primary}88`,
				"#0d0d0d",
			];
		} else {
			return [
				`${primary}AA`,
				`${secondary}99`,
				primary,
				secondary,
				"#FFFFFF",
				"#FEFEFE",
				"#F8F8F8",
				`${primary}66`,
				`${secondary}55`,
			];
		}
	};

	return (
		<MeshGradientView
			style={{ flex: 1 }}
			columns={3}
			rows={3}
			colors={getThemeColors()}
			points={[
				[0.0, 0.0],
				[0.5, 0.0],
				[1.0, 0.0],
				[0.0, 0.5],
				[0.5, 0.5],
				[1.0, 0.5],
				[0.0, 1.0],
				[0.5, 1.0],
				[1.0, 1.0],
			]}
		/>
	);
}
