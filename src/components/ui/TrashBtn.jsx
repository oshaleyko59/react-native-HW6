import { Pressable, StyleSheet } from "react-native";
import { Trash2 } from "react-native-feather";
import { COLORS } from "../../common/constants";

export default function TrashBtn({ active, onPress, style }) {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.btnContainer,
				style,
				pressed && styles.pressed,
			]}
			onPress={onPress}
		>
			<Trash2
				stroke={active ? COLORS.mainText : COLORS.inactive}
				fill="none"
				width={24}
				height={24}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	btnContainer: {
		borderRadius: 20,
    backgroundColor:   COLORS.inactiveBkg,
    opacity:0.5,
		width: 70,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	pressed: {
		opacity: 0.1,
		backgroundColor: COLORS.accent,
	},
});
