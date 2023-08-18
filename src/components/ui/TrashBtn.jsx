import { Pressable, StyleSheet } from "react-native";
import { Trash2 } from "react-native-feather";
import { COLORS } from "../../common/constants";

export default function TrashBtn({ active, onPress }) {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.btnContainer,
				pressed && styles.pressed,
			]}
			onPress={onPress}
		>
			<Trash2
				stroke={active ? COLORS.accent : COLORS.inactive}
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
		backgroundColor: COLORS.Gray02,
		opacity: 0.5,
		width: 70,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
	},
	pressed: {
		opacity: 0.5,
		backgroundColor: COLORS.accent,
	},
	active: {
		opacity: 1,
	},
});
