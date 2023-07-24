import { View, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import { COLORS } from "../../common/constants";

export default function SendBtn({ onPress }) {
	return (<View style={styles.container}>
		<IconButton
			icon="arrow-up"
			color={COLORS.secondaryText}
			size={14}
			onPress={onPress}
		/></View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.accent,
		color: COLORS.secondaryText,
		height: 34,
		width: 34,
		borderRadius: 17,
	},
});
