import { Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../common/constants";

function IconButton({ icon, color, size, onPress, style }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
			android_ripple={{ color: COLORS.accent }}
			onPress={onPress}
		>
			<Feather name={icon} color={color} size={size} />
		</Pressable>
	);
}

export default IconButton;

const styles = StyleSheet.create({
	button: {
		justifyContent: "center",
		alignItems: "center",
		//	margin: 8,
		//	borderRadius: 20,
		/* 		padding: 8,
		justifyContent: "center",
		alignItems: "center",
    //  FIXME: android_ripple={{ color: "orangered" }}
     */
	},
	pressed: {
    opacity: 0.5,
    backgroundColor: COLORS.accent
	},
});
