import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../../common/constants";

//main button on the page - Login / Register
export default function MainBtn({ active,title, onPress }) {
	return (
		<Pressable
			onPress={onPress}
			android_ripple={{ color: COLORS.accent }}
			style={({ pressed }) => [
				styles.btn,
				active && styles.active,
				active && pressed && styles.pressed,
			]}
		>
			<View>
				<Text style={styles.btnTitle}>{title}</Text>
			</View>
		</Pressable>
	);
}
//TODO: fix overflow for android ripple
const styles = StyleSheet.create({
	btn: {
		height: 51,
		marginBottom: 16,
		borderRadius: 100,
		alignItems: "center",
		padding: 16,
		color: COLORS.secondaryText,
		backgroundColor: COLORS.mainBkg,
		opacity: 0.5,
		overflow: "hidden",
	},
	active: {
		backgroundColor: COLORS.accent,
		opacity: 1,
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
