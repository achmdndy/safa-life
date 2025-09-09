import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
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
						<Stack>
							<Stack.Screen name="index" options={{ headerShown: false }} />
							<Stack.Screen
								name="onboarding"
								options={{ headerShown: false }}
							/>
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
							<Stack.Screen
								name="almsgiving"
								options={{ headerShown: false }}
							/>
							<Stack.Screen name="features" options={{ headerShown: false }} />
							<Stack.Screen name="search" options={{ headerShown: false }} />
							<Stack.Screen name="settings" options={{ headerShown: false }} />
							<Stack.Screen name="articles" options={{ headerShown: false }} />
							<Stack.Screen name="reels" options={{ headerShown: false }} />
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen name="+not-found" />
						</Stack>
					</GestureHandlerRootView>
					<PortalHost />
				</ThemeProvider>
			</LanguageProvider>
		</RealmProvider>
	);
}
