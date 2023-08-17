import { db } from "../../../firebase/config";
import { StyleSheet, View, Text } from "react-native";

import IconButton from "../../ui/IconButton";
import { COLORS } from "../../../common/constants";

export default function Place({ text, onPress }) {
	return (
		<View style={styles.btnContainer}>
			<IconButton
				icon={"map-pin"}
				size={20}
				color={COLORS.inactive}
				onPress={onPress}
			/>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	btnContainer: { flexDirection: "row", gap: 6 },
	text: {
		marginLeft: 6,
		fontSize: 16,
		lineHeight: 19,
		color: COLORS.mainText,
		fontFamily: "Roboto-Medium",
		textDecorationStyle: "solid",
		textDecorationLine: "underline",
	},
});
