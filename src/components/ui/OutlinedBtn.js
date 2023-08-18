import { Pressable, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../common/constants";

export default function OutlinedBtn({ onPress, icon,children }) {
	return (
		<Pressable
			onPress={onPress}
			style={({pressed}) => [styles.button, pressed && styles.pressed]}
		>
			<Feather
				name={icon}
				size={20}
				color={COLORS.accent}
				style={styles.icon}
			/>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 4,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.mainBkg,
    borderRadius:10
	},
	pressed: { opacity: 0.7, backgroundColor: COLORS.accent },
	icon: { marginRight: 6 },
	text: { color: COLORS.mainText },
});
