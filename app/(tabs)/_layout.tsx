import { THEME } from "@/lib/theme";
import { Tabs } from "expo-router";
import { BookOpen, HandHeart, Home, Play, User,  } from "lucide-react-native";
import { Platform } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
				tabBarLabelStyle: {
					marginTop: 6,
					fontSize: 12.
				},
				tabBarActiveTintColor: THEME.light.primary,
				tabBarInactiveTintColor: THEME.light.mutedForeground,
				tabBarStyle: [Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
					},
					default: {},
				}), {
					paddingTop: 4
				}],
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({color}) => (
						<Home width={25} height={25} stroke={color}/>
					)
				}}
			/>
			<Tabs.Screen
				name="quran"
				options={{
					title: "Quran",
					tabBarIcon: ({color}) => (
						<BookOpen width={25} height={25} stroke={color}/>
					)
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({color}) => (
						<Play width={25} height={25} stroke={color}/>
					)
				}}
			/>
			<Tabs.Screen
				name="charity"
				options={{
					title: "Charity",
					tabBarIcon: ({color}) => (
						<HandHeart width={25} height={25} stroke={color}/>
					)
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({color}) => (
						<User width={25} height={25} stroke={color}/>
					)
				}}
			/>
		</Tabs>
	);
}
