import { StyleSheet, View, Text, Image } from "react-native";

import formatDT from "../../helpers/datetime-format";
import { COLORS } from "../../common/constants";

import DUMMY from "../../../z.ignore/dummy";
import getGravatarUrl from "../../helpers/getGravatarUrl";

//console.log("DUMMY>>", DUMMY);

export default function CommentCard({ authorEmail, text, dtStamp }) {
	console.log("CommentCard>>", text);
	const ava = getGravatarUrl(authorEmail, 28); //TODO: photoURL from user???
	return (
		<View
			style={[
				styles.container,
				ava === DUMMY.avatar28
					? { flexDirection: "row" }
					: { flexDirection: "row-reverse" },
			]}
		>
			<View style={styles.avatar}>
				<Image source={ava} />
			</View>
			<View
				style={[
					styles.contentContainer,
					ava === DUMMY.avatar28
						? { borderTopLeftRadius: 0 }
						: { borderTopRightRadius: 0 },
				]}
			>
				<Text style={styles.text}>{text}</Text>
				<Text style={styles.date}>{formatDT(dtStamp)}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 24,
		gap: 16,
	},
	avatar: {
		width: 28,
		height: 28,
		flexShrink: 0,
		borderRadius: 14,
		overflow: "hidden",
	},
  contentContainer: {
    flex:1,
    padding: 16,
    backgroundColor: COLORS.Gray01,
    borderRadius: 6,
	},
	text: {
		fontSize: 13,
		lineHeight: 18,
		color: COLORS.mainText,
		fontFamily: "Roboto-Regular",
		marginBottom: 8,
	},
	date: {
		fontSize: 11,
		lineHeight: 18,
		color: COLORS.inactive,
		fontFamily: "Roboto-Regular",
		marginBottom: 8,
	},
});
