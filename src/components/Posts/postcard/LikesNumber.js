import { db } from "../../../firebase/config";
import { StyleSheet, View, Text } from "react-native";

import IconButton from "../../ui/IconButton";
import { COLORS } from "../../../common/constants";

export default function LikesNumber({ likesCount, onPress }) {
	return (
		<View style={styles.btnContainer}>
			<IconButton
				icon={"thumbs-up"}
				size={20}
				color={COLORS.inactive}
				onPress={onPress}
			/>
			<Text
				style={[
					styles.number,
					likesCount === 0 && { color: COLORS.inactive },
				]}
			>
				{likesCount}
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
