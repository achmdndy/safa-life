import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/theme-context";
import { useRouter } from "expo-router";
import { 
  ChevronRight, 
  Lock, 
  Shield, 
  Trash2, 
  User, 
  Bell, 
  Globe, 
  Moon, 
  HelpCircle 
} from "lucide-react-native";
import { Pressable, View } from "react-native";

interface MenuItem {
  id: string;
  title: string;
  icon: any;
  isDestructive?: boolean;
  hasChevron?: boolean;
  href?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "Account Settings",
    items: [
      {
        id: "change-password",
        title: "Change Password",
        icon: Lock,
        hasChevron: true
      },
      {
        id: "privacy-security",
        title: "Privacy & Security",
        icon: Shield,
        hasChevron: true
      },
      {
        id: "delete-account",
        title: "Delete Account",
        icon: Trash2,
        isDestructive: true,
        hasChevron: false
      }
    ]
  },
  {
    title: "Personal Information",
    items: [
      {
        id: "edit-profile",
        title: "Edit Profile Details",
        icon: User,
        hasChevron: true
      }
    ]
  },
  {
    title: "Notification Preferences",
    items: [
      {
        id: "manage-notifications",
        title: "Manage Notifications",
        icon: Bell,
        hasChevron: true
      }
    ]
  },
  {
    title: "App Settings",
    items: [
      {
        id: "language",
        title: "Language",
        icon: Globe,
        hasChevron: true
      },
      {
        id: "theme",
        title: "Theme",
        icon: Moon,
        hasChevron: true,
        href: "/(tabs)/profile/theme"
      },
      {
        id: "help-support",
        title: "Help & Support",
        icon: HelpCircle,
        hasChevron: true
      }
    ]
  }
];

export function ProfileMenu() {
  const { currentTheme, themes } = useTheme();
  const selectedTheme = themes[currentTheme];
  const router = useRouter()

  const handleClick = (item: MenuItem) => {
    if (!item.href) return
    router.navigate(item.href)
  }

  const renderMenuItem = (item: MenuItem) => (
    <Pressable
      key={item.id}
      className="flex-row items-center py-3 px-4 bg-card active:bg-card"
      android_ripple={{ color: '#f3f4f6' }}
      onPress={() => handleClick(item)}
    >
      <View className="w-8 h-8 rounded-lg items-center justify-center mr-3"
        style={{
          backgroundColor: selectedTheme.secondary + '20',
        }}
      >
        <Icon 
          as={item.icon} 
          size={16}
          stroke={selectedTheme.primary}
        />
      </View>
      
      <View className="flex-1">
        <Text className="text-sm font-medium">
          {item.title}
        </Text>
      </View>
      
      {item.hasChevron && (
        <Icon as={ChevronRight} size={16} className="text-gray-400" />
      )}
    </Pressable>
  );

  return (
    <View className="px-4 pb-8">
      {menuSections.map((section, sectionIndex) => (
        <View key={section.title} className={sectionIndex > 0 ? 'mt-4' : 'mt-6'}>
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
  )
}