import { StyleSheet, View, Text } from "react-native";

import { COLORS } from "../../../common/constants";

export default function Title({title}) {

return (
	<View style={styles.titleContainer}>
		<Text style={styles.titleStyle}>{title}</Text>
	</View>
);
}


const styles = StyleSheet.create({
	titleContainer: { marginVertical: 4 },
	titleStyle: {
		fontSize: 16,
		lineHeight: 19,
		color: COLORS.mainText,
		fontFamily: "Roboto-Medium",
	},
});
