import { useRouter } from "expo-router";
import {
	Bell,
	ChevronRight,
	Globe,
	HelpCircle,
	Lock,
	type LucideIcon,
	Moon,
	Shield,
	Trash2,
	User,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";

interface MenuItem {
	id: string;
	title: string;
	icon: LucideIcon;
	isDestructive?: boolean;
	hasChevron?: boolean;
	href?: string;
}

interface MenuSection {
	title: string;
	items: MenuItem[];
}

export default function ProfileMenu() {
	const { t } = useTranslation("profile");
	const { currentTheme, themes } = useTheme();
	const selectedTheme = themes[currentTheme];
	const router = useRouter();

	const menuSections: MenuSection[] = [
		{
			title: t("menu.sections.accountSettings"),
			items: [
				{
					id: "change-password",
					title: t("menu.items.changePassword"),
					icon: Lock,
					hasChevron: true,
				},
				{
					id: "privacy-security",
					title: t("menu.items.privacySecurity"),
					icon: Shield,
					hasChevron: true,
				},
				{
					id: "delete-account",
					title: t("menu.items.deleteAccount"),
					icon: Trash2,
					isDestructive: true,
					hasChevron: false,
				},
			],
		},
		{
			title: t("menu.sections.personalInformation"),
			items: [
				{
					id: "edit-profile",
					title: t("menu.items.editProfile"),
					icon: User,
					hasChevron: true,
				},
			],
		},
		{
			title: t("menu.sections.notificationPreferences"),
			items: [
				{
					id: "manage-notifications",
					title: t("menu.items.manageNotifications"),
					icon: Bell,
					hasChevron: true,
				},
			],
		},
		{
			title: t("menu.sections.appSettings"),
			items: [
				{
					id: "language",
					title: t("menu.items.language"),
					icon: Globe,
					hasChevron: true,
					href: "/settings/language",
				},
				{
					id: "theme",
					title: t("menu.items.theme"),
					icon: Moon,
					hasChevron: true,
					href: "/settings/theme",
				},
				{
					id: "help-support",
					title: t("menu.items.helpSupport"),
					icon: HelpCircle,
					hasChevron: true,
				},
			],
		},
	];

	const handleClick = (item: MenuItem) => {
		if (!item.href) return;
		router.navigate(item.href);
	};

	const renderMenuItem = (item: MenuItem) => (
		<Pressable
			key={item.id}
			className="flex-row items-center py-3 px-4 bg-card active:bg-card"
			android_ripple={{ color: "#f3f4f6" }}
			onPress={() => handleClick(item)}
			accessible={true}
			accessibilityRole="button"
			accessibilityLabel={t(`menu.accessibility.${item.id.replace("-", "")}`)}
			accessibilityHint={t("accessibility.navigateToSettings")}
		>
			<View
				className="w-8 h-8 rounded-lg items-center justify-center mr-3"
				style={{
					backgroundColor: `${selectedTheme.secondary}20`,
				}}
			>
				<Icon as={item.icon} size={16} stroke={selectedTheme.primary} />
			</View>

			<View className="flex-1">
				<Text className="text-sm font-medium">{item.title}</Text>
			</View>

			{item.hasChevron && (
				<Icon as={ChevronRight} size={16} className="text-gray-400" />
			)}
		</Pressable>
	);

	return (
		<View
			className="px-4 pb-8"
			accessible={true}
			accessibilityLabel={t("accessibility.menuSection")}
		>
			{menuSections.map((section, sectionIndex) => (
				<View
					key={section.title}
					className={sectionIndex > 0 ? "mt-4" : "mt-6"}
				>
					<Text className="text-sm font-semibold text-foreground/80 mb-2">
						{section.title}
					</Text>

					<View
						className="bg-card rounded-2xl overflow-hidden"
						style={{
							shadowColor: selectedTheme.primary,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.08,
							shadowRadius: 8,
							elevation: 3,
						}}
					>
						{section.items.map((item, itemIndex) => (
							<View key={item.id}>
								{renderMenuItem(item)}
								{itemIndex < section.items.length - 1 && (
									<View className="h-px bg-gray-100 dark:bg-primary-foreground ml-14" />
								)}
							</View>
						))}
					</View>
				</View>
			))}
		</View>
	);
}
