import { FlatList, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../common/constants";
import CommentCard  from "./CommentCard";

export default function CommentsList({ comments }) {

	if (!comments || (comments.length === 0)) { //TODO: remove, no need
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No comments yet - start commenting!
				</Text>
			</View>
		);
  }

  return (
		<View
			style={styles.container}
		>
			<FlatList
				data={comments}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => <CommentCard {...itemData.item} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.mainBkg,
	},

	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 16,
		color: COLORS.mainText,
	},
});
