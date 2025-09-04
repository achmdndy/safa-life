import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { Heart, ChevronRight, Users, Target, Clock } from "lucide-react-native";
import { Pressable, View } from "react-native";

const communityData = [
  {
    id: 1,
    category: "Education",
    title: "Build Islamic School in Rural Area",
    description: "Help us build a new Islamic school to provide quality education for 500+ children in underserved communities.",
    raised: 75000,
    target: 100000,
    donors: 234,
    daysLeft: 15,
    urgent: true
  },
  {
    id: 2,
    category: "Healthcare",
    title: "Medical Aid for Gaza Children",
    description: "Provide essential medical supplies and treatment for children affected by the ongoing Crisis.",
    raised: 45000,
    target: 80000,
    donors: 189,
    daysLeft: 8,
    urgent: true
  },
  {
    id: 3,
    category: "Water",
    title: "Clean Water Wells Project",
    description: "Install water wells in drought-affected areas to provide clean drinking water for entire villages.",
    raised: 32000,
    target: 60000,
    donors: 156,
    daysLeft: 22,
    urgent: false
  },
  {
    id: 4,
    category: "Food",
    title: "Ramadan Food Packages",
    description: "Distribute nutritious food packages to families in need during the holy month of Ramadan.",
    raised: 18000,
    target: 25000,
    donors: 98,
    daysLeft: 5,
    urgent: true
  }
];

export function ChairityCommunity() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View className="px-4 gap-4 mt-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Icon as={Heart} size={20} className="text-primary mr-2" />
          <Text className="font-bold text-xl">Community Causes</Text>
        </View>
        <Pressable className="flex-row items-center">
          <Text className="text-primary text-sm mr-1">View all</Text>
          <Icon as={ChevronRight} size={16} className="text-primary" />
        </Pressable>
      </View>

      <View className="gap-4">
        {communityData.map((cause) => {
          const progressPercentage = (cause.raised / cause.target) * 100;
          
          return (
            <Card 
              key={cause.id} 
              className="border-transparent p-4 gap-1"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
              }}
            >
              <CardContent className="p-0">
                <AspectRatio ratio={16/9}>
                  <View className="relative">
                    <Skeleton className="w-full h-full bg-gray-200"/>
                    {cause.urgent && (
                      <View className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white px-2 py-1">
                          <Text className="text-xs font-medium">URGENT</Text>
                        </Badge>
                      </View>
                    )}
                    <View className="absolute top-3 right-3">
                      <Badge className="bg-black/70 text-white px-2 py-1">
                        <Text className="text-xs">{cause.category}</Text>
                      </Badge>
                    </View>
                  </View>
                </AspectRatio>

                <View className="pt-4">
                  <Text className="text-lg font-bold text-gray-900 mb-2 leading-6">
                    {cause.title}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-4 leading-5">
                    {cause.description}
                  </Text>

                  <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm font-medium text-gray-700">
                        {formatCurrency(cause.raised)} raised
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {Math.round(progressPercentage)}% of {formatCurrency(cause.target)}
                      </Text>
                    </View>
                    <Progress value={progressPercentage} className="h-2" />
                  </View>

                  <View className="flex-row justify-between items-center mb-4">
                    <View className="flex-row items-center">
                      <Icon as={Users} size={14} className="text-gray-500 mr-1" />
                      <Text className="text-xs text-gray-600">
                        {cause.donors} donors
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Icon as={Clock} size={14} className="text-gray-500 mr-1" />
                      <Text className="text-xs text-gray-600">
                        {cause.daysLeft} days left
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Icon as={Target} size={14} className="text-gray-500 mr-1" />
                      <Text className="text-xs text-gray-600">
                        Goal: {formatCurrency(cause.target)}
                      </Text>
                    </View>
                  </View>
                </View>
              </CardContent>
              
              <CardFooter className="p-0">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 rounded-lg py-3"
                  size="lg"
                >
                  <Text className="text-white font-semibold">Donate Now</Text>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </View>
    </View>
  )
}