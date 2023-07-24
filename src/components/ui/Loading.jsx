import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS } from "../../common/constants";

function Loading({ msg }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{msg}</Text>
			<ActivityIndicator size="large" />
		</View>
	);
}
export default Loading;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},

	text: {
		marginBottom: 20,
		fontSize: 20,
		textAlign: "center",
		color: COLORS.secondaryText,
	},
});
