import { StatusBar, View } from "react-native";
import Animated from "react-native-reanimated";
import { OnboardingConnected } from "./_components/onboarding-connected";
import { OnboardingFinal } from "./_components/onboarding-final";
import { OnboardingHeaderButton } from "./_components/onboarding-header-button";
import { OnboardingInspiration } from "./_components/onboarding-inspiration";
import { OnboardingNextButton } from "./_components/onboarding-next-button";
import { OnboardingSpirituality } from "./_components/onboarding-spirituality";
import { OnboardingWelcome } from "./_components/onboarding-welcome";
import { useOnboarding } from "./_hooks/use-onboarding";

export default function OnboardingScreen() {
	const {
		currentPage,
		animationProgress,
		relaxTranslateYStyle,
		onNextClick,
		onBackClick,
		onSkipClick,
	} = useOnboarding();

	return (
		<View className="flex-1 bg-background">
			<StatusBar barStyle={`${currentPage > 0 ? "dark" : "light"}-content`} />
			<OnboardingHeaderButton
				{...{ onBackClick, onSkipClick, animationProgress }}
			/>
			<OnboardingWelcome {...{ onNextClick, animationProgress }} />
			<Animated.View
				className="justify-center absolute inset-0"
				style={relaxTranslateYStyle}
			>
				<OnboardingSpirituality {...{ animationProgress }} />
				<OnboardingConnected {...{ animationProgress }} />
				<OnboardingInspiration {...{ animationProgress }} />
				<OnboardingFinal {...{ animationProgress }} />
			</Animated.View>
			<OnboardingNextButton {...{ onNextClick, animationProgress }} />
		</View>
	);
}
