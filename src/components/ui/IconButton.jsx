import { Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../common/constants";

function IconButton({ icon, color, size, onPress, style }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
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
	},
	pressed: {
    opacity: 0.5,
    backgroundColor: COLORS.accent
	},
});
