import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../common/constants";
import UnderlinedTextBtn from "./UnderlinedTextBtn";

//secondary button on Login and Registration page (shapeless)
export default function AuthSecondaryBtn({ title, hint, onPress }) {
	return (
		<View style={styles.btn}>
			<Text style={styles.hintText}>{hint}</Text>
			<UnderlinedTextBtn
				title={title}
				textStyle={styles.hintText}
				onPress={onPress}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	btn: { flexDirection: "row", justifyContent: "center", gap: 4 },


});
