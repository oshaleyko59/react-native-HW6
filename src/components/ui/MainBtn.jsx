import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../../common/constants";

//main button on the page - Login / Register
export default function MainBtn({ title, onPress }) {
	return (
		<Pressable
			onPress={onPress}
			android_ripple={{ color: "orangered" }}
			style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
		>
			<View>
				<Text style={styles.btnTitle}>{title}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	btn: {
		height: 51,
		marginBottom: 16,
		borderRadius: 100,
		alignItems: "center",
		padding: 16,
		color: COLORS.secondaryText,
		backgroundColor: COLORS.accent,
	},

	pressed: {
		opacity: 0.5,
	},

	btnTitle: {
		color: COLORS.secondaryText,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
});
