import { View, Text, Pressable, StyleSheet } from "react-native";

import { COLORS } from "../../common/constants";

export default function UnderlinedTextBtn({ title, onPress}) {
	return (
		<Pressable
			onPress={onPress}
			android_ripple={{ color: "orangered" }}
			style={({ pressed }) => [pressed && styles.pressed]}
		>
			<View>
				<Text style={[styles.text]}>{title}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.5,
	},

	text: {
		color: COLORS.accent,
		fontSize: 16,
		lineHeight: 19,
    fontFamily: "Roboto-Regular",
    textDecorationStyle: "solid",
		textDecorationLine: "underline",
	},
});
