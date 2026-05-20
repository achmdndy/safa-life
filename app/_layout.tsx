import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { RealmProvider } from "@realm/react";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LanguageProvider from "@/contexts/language-context";
import { TanStackProvider } from "@/contexts/tanstack-query-context";
import ThemeProvider from "@/contexts/theme-context";
import { migration, schemas, schemaVersion } from "@/schemas/realms";

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		NotoNaskhArabic: require("../assets/fonts/NotoNaskhArabic-Regular.ttf"),
		"NotoNaskhArabic-Medium": require("../assets/fonts/NotoNaskhArabic-Medium.ttf"),
		"NotoNaskhArabic-SemiBold": require("../assets/fonts/NotoNaskhArabic-SemiBold.ttf"),
		"NotoNaskhArabic-Bold": require("../assets/fonts/NotoNaskhArabic-Bold.ttf"),
	});

	if (!fontsLoaded) return null;

	return (
		<RealmProvider
			schema={schemas}
			schemaVersion={schemaVersion}
			onMigration={migration}
		>
			<LanguageProvider>
				<ThemeProvider>
					<TanStackProvider>
						<GestureHandlerRootView>
							<ActionSheetProvider>
								<BottomSheetModalProvider>
									<Stack>
										<Stack.Screen
											name="index"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="onboarding"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="(tabs)"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="notifications"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="quran"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="almsgiving"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="features"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="search"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="settings"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="articles"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="reels"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="(auth)"
											options={{ headerShown: false }}
										/>
										<Stack.Screen name="+not-found" />
									</Stack>
								</BottomSheetModalProvider>
							</ActionSheetProvider>
						</GestureHandlerRootView>
					</TanStackProvider>
					<PortalHost />
				</ThemeProvider>
			</LanguageProvider>
		</RealmProvider>
	);
}
