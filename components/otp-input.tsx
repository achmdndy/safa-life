import React, { useRef, useState } from "react";
import { Dimensions, Keyboard, type TextInput, View } from "react-native";
import { Input } from "./ui/input";

type OTPInputProps = {
	digits: number;
	onComplete: (otp: string) => void;
};

export const OTPInput = ({ digits = 6, onComplete }: OTPInputProps) => {
	const [otp, setOtp] = useState<string[]>(Array(digits).fill(""));
	const inputs = useRef<(TextInput | null)[]>([]);

	const screenWidth = Dimensions.get("window").width;
	const screenPadding = 24 * 2; // Corresponds to px-6 on the parent screen
	const spacing = 8; // Corresponds to gap-2 on the container
	
	// Calculate the width for each input box to fit the screen
	const availableWidth = screenWidth - screenPadding - (spacing * (digits - 1));
	const inputWidth = availableWidth / digits;

	const handleChange = (text: string, index: number) => {
		const newOtp = [...otp];
		newOtp[index] = text.slice(-1);
		setOtp(newOtp);

		if (text && index < digits - 1) {
			inputs.current[index + 1]?.focus();
		}

		if (newOtp.join("").length === digits) {
			Keyboard.dismiss();
			onComplete(newOtp.join(""));
		}
	};

	const handleKeyPress = (key: string, index: number) => {
		if (key === "Backspace" && !otp[index] && index > 0) {
			inputs.current[index - 1]?.focus();
		}
	};

	return (
		<View
			className="flex flex-row justify-center gap-2"
		>
			{otp.map((_, index) => (
				<Input
					key={index.toString()}
					ref={(ref) => {
						inputs.current[index] = ref;
					}}
					keyboardType="number-pad"
					maxLength={1}
					value={otp[index]}
					onChangeText={(text) => handleChange(text, index)}
					onKeyPress={({ nativeEvent }) =>
						handleKeyPress(nativeEvent.key, index)
					}
					className="border border-gray-300 text-center rounded-md"
					style={{
						width: inputWidth,
						height: inputWidth,
						fontSize: 16,
						paddingVertical: 0,
					}}
				/>
			))}
		</View>
	);
};