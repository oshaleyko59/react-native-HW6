import { StyleSheet } from "react-native";
import IconButton from "./IconButton";
import { COLORS } from "../../common/constants";

export default function SendBtn({ onPress }) {
	return (
		<IconButton
			icon="arrow-up"
			color={COLORS.secondaryText}
			size={14}
      onPress={onPress}
      style={styles.container}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.accent,
		color: COLORS.secondaryText,
		height: 34,
		width: 34,
		borderRadius: 17,
	},
});

