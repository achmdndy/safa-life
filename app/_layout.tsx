import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { RealmProvider } from "@realm/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LanguageProvider } from "@/contexts/language-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { schemas } from "@/schemas/realms";

export default function RootLayout() {
	return (
		<RealmProvider schema={schemas}>
			<LanguageProvider>
				<ThemeProvider>
					<GestureHandlerRootView>
						<ActionSheetProvider>
							<BottomSheetModalProvider>
								<Stack>
									<Stack.Screen name="index" options={{ headerShown: false }} />
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
									<Stack.Screen name="quran" options={{ headerShown: false }} />
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
									<Stack.Screen name="reels" options={{ headerShown: false }} />
									<Stack.Screen
										name="(auth)"
										options={{ headerShown: false }}
									/>
									<Stack.Screen name="+not-found" />
								</Stack>
							</BottomSheetModalProvider>
						</ActionSheetProvider>
					</GestureHandlerRootView>
					<PortalHost />
				</ThemeProvider>
			</LanguageProvider>
		</RealmProvider>
	);
}
