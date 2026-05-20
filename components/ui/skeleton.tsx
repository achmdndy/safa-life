import { cn } from "@/lib/utils";
import { View } from "react-native";

function Skeleton({
    className,
    ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
    return (
        <View
            className={cn("bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md", className)}
            {...props}
        />
    );
}

export { Skeleton };
