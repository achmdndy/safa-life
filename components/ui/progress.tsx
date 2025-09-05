import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@rn-primitives/progress";
import { Platform, View } from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
} from "react-native-reanimated";

function Progress({
	className,
	value,
	indicatorClassName,
	indicatorStyle,
	...props
}: ProgressPrimitive.RootProps &
	React.RefAttributes<ProgressPrimitive.RootRef> & {
		indicatorClassName?: string;
		indicatorStyle?: any;
	}) {
	return (
		<ProgressPrimitive.Root
			className={cn(
				"bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
				className,
			)}
			{...props}
		>
			<Indicator value={value} className={indicatorClassName} style={indicatorStyle} />
		</ProgressPrimitive.Root>
	);
}

export { Progress };

const Indicator = Platform.select({
	web: WebIndicator,
	native: NativeIndicator,
	default: NullIndicator,
});

type IndicatorProps = {
	value: number | undefined | null;
	className?: string;
	style?: any;
};

function WebIndicator({ value, className, style }: IndicatorProps) {
	if (Platform.OS !== "web") {
		return null;
	}

	return (
		<View
			className={cn(
				"bg-primary h-full w-full flex-1 transition-all",
				className,
			)}
			style={[{ transform: `translateX(-${100 - (value ?? 0)}%)` }, style]}
		>
			<ProgressPrimitive.Indicator className={cn("h-full w-full", className)} />
		</View>
	);
}

function NativeIndicator({ value, className, style }: IndicatorProps) {
	const progress = useDerivedValue(() => value ?? 0);

	const indicator = useAnimatedStyle(() => {
		return {
			width: withSpring(
				`${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
				{ overshootClamping: true },
			),
			...style,
		};
	}, [value, style]);

	if (Platform.OS === "web") {
		return null;
	}

	return (
		<ProgressPrimitive.Indicator asChild>
			<Animated.View
				style={indicator}
				className={cn("bg-foreground h-full", className)}
			/>
		</ProgressPrimitive.Indicator>
	);
}

function NullIndicator(_props: IndicatorProps) {
	return null;
}
