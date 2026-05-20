import { FlashList } from "@shopify/flash-list";
import { StatusBar, View } from "react-native";
import NotificationEmptyState from "./_components/notification-empty-state";
import NotificationItem from "./_components/notification-item";
import NotificationsHeader from "./_components/notifications-header";
import { useNotificationsScreen } from "./_hooks/use-notifications-screen";

export default function NotificationsScreen() {
	const { t, theme, notifications, handleMarkAllAsRead, handleItemPress } =
		useNotificationsScreen();

	return (
		<View className="flex-1 bg-background">
			<StatusBar
				barStyle={theme === "dark" ? "light-content" : "dark-content"}
			/>
			<NotificationsHeader onMarkAllAsRead={handleMarkAllAsRead} />
			<FlashList
				data={notifications}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<NotificationItem
						item={item}
						onPress={() => handleItemPress(item.id)}
					/>
				)}
				ListEmptyComponent={NotificationEmptyState}
				contentContainerStyle={{ flexGrow: 1 }}
				accessibilityLabel={t("accessibility.notificationList")}
			/>
		</View>
	);
}
