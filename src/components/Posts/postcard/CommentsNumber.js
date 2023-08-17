import { db } from "../../../firebase/config";
import { StyleSheet, View, Text } from "react-native";

import IconButton from "../../ui/IconButton";
import { COLORS } from "../../../common/constants";

export default function CommentsNumber({ commentsCount, onPress}) {
	return (
		<View style={styles.btnContainer}>
			<IconButton
				icon={"message-circle"}
				size={20}
				color={COLORS.inactive}
				onPress={onPress}
			/>
			<Text
				style={[
					styles.number,
					commentsCount === 0 && { color: COLORS.inactive },
				]}
			>
				{commentsCount}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	btnContainer: { flexDirection: "row", gap: 6 },
	number: {
		fontSize: 16,
		lineHeight: 19,
		color: COLORS.mainText,
		fontFamily: "Roboto-Medium",
	},
});
