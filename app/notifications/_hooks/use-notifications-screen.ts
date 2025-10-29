import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/theme-context";

const MOCK_NOTIFICATIONS = [
	{
		id: "1",
		type: "payment" as const,
		title: "Payment Successful",
		description:
			"Your donation of $50 to 'Build Islamic School' was successful. May Allah reward you.",
		time: "10 minutes ago",
		read: false,
	},
	{
		id: "2",
		type: "community" as const,
		title: "Community Update",
		description:
			"The 'Clean Water Wells Project' has reached 80% of its goal. Thank you for your support!",
		time: "1 hour ago",
		read: false,
	},
	{
		id: "3",
		type: "reminder" as const,
		title: "Prayer Reminder",
		description:
			"It's almost time for Asr prayer. Prepare yourself for prayer.",
		time: "3 hours ago",
		read: true,
	},
	{
		id: "4",
		type: "article" as const,
		title: "New Article Published",
		description:
			"A new article 'The Beauty of Islamic Architecture' is now available to read.",
		time: "1 day ago",
		read: true,
	},
];

export function useNotificationsScreen() {
	const { t } = useTranslation("notifications");
	const { theme } = useTheme();
	const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

	const handleMarkAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	};

	const handleItemPress = (itemId: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === itemId ? { ...n, read: true } : n)),
		);
	};

	return {
		t,
		theme,
		notifications,
		handleMarkAllAsRead,
		handleItemPress,
	};
}
