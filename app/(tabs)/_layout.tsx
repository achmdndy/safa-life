import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
				}}
			/>
			<Tabs.Screen
				name="quran"
				options={{
					title: "Quran",
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
				}}
			/>
			<Tabs.Screen
				name="charity"
				options={{
					title: "Charity",
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
				}}
			/>
		</Tabs>
	);
}
