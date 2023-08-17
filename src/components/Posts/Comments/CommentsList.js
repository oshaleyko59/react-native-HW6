import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ref, child, onChildAdded } from "firebase/database";

import { db } from "../../../firebase/config";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { COLORS } from "../../../common/constants";

export default function CommentsList({ postId }) {
	//	console.debug("CommentsList>>postId", postId);
	const [comments, setComments] = useState([]);
	const commentsRef = child(ref(db), "comments/" + postId);

  useEffect(() => {
		const unsubscribe = onChildAdded(commentsRef, (data) => {
			const key = data.key;
			const item = {...data.val()};
      item.id = key;
      console.debug("onChildAdded>>comment text", item.text);
			setComments((state) => [...state, item]);
		});
		return unsubscribe; //returns Unsubcribe func
	}, []);

	if (!comments || comments.length === 0) {
		//TODO: remove, no need?
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No comments yet - start commenting!
				</Text>
			</View>
		);
	}
console.debug("FlatList>>comments", comments);
	return (
		<View style={styles.container}>
			<Text>{comments.length}</Text>
			<FlatList
				data={comments}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <CommentCard {...item} />}
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
