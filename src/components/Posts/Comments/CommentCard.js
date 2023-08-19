import { StyleSheet, View, Text, Image } from "react-native";

import useAuth from "../../../hooks/useAuth";
import formatDT from "../../../helpers/datetime-format";
import { COLORS } from "../../../common/constants";

export default function CommentCard(props) {
  const { user } = useAuth();
  const { authorId, avatar, dtCreated, text } = props;

	return (
		<View
			style={[
				styles.container,
				user.uid !== authorId
					? { flexDirection: "row" }
					: { flexDirection: "row-reverse" },
			]}
		>
			<View style={styles.avatar}>
				<Image source={{ uri: avatar }} alt="Author's avatar" style={styles.avatar} />
			</View>
			<View
				style={[
					styles.contentContainer,
					user.uid !== authorId
						? { borderTopLeftRadius: 0 }
						: { borderTopRightRadius: 0 },
				]}
			>
				<Text style={styles.text}>{text}</Text>
				<Text style={styles.date}>{formatDT(dtCreated)}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginVertical: 12,
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
    textAlign:"right"
	},
});
