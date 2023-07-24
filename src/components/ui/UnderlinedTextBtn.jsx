import { View, Text, Pressable, StyleSheet } from "react-native";

export default function UnderlinedTextBtn({ title, onPress, textStyle }) {
	return (
		<Pressable
			onPress={onPress}
			android_ripple={{ color: "orangered" }}
			style={({ pressed }) => [pressed && styles.pressed]}
		>
			<View>
				<Text style={[textStyle, styles.underlined]}>{title}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.5,
	},

	underlined: {
		textDecorationStyle: "solid",
		textDecorationLine: "underline",
	},
});
