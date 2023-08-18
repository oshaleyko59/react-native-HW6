import { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { ref, child, onChildAdded } from "firebase/database";

import { db } from "../../../firebase/config";
import CommentCard from "./CommentCard";
import { COLORS } from "../../../common/constants";

export default function CommentsList({ postId }) {
	const [comments, setComments] = useState([]);
  const commentsRef = child(ref(db), "comments/" + postId);

  console.debug("CommentsList>>#", comments.length);

	useEffect(() => {
		const unsubscribe = onChildAdded(commentsRef, (data) => {
			const key = data.key;
			const item = { ...data.val() };
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

	return (
			<FlatList
				data={comments}
				keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentCard {...item} />}
			/>
	);
}

const styles = StyleSheet.create({
	container: {
    backgroundColor: COLORS.mainBkg,//style={styles.container}
    paddingVertical:16
	},

	fallbackContainer: {
		flex: 1,
	//	justifyContent: "center",
		alignItems: "stretch",
	},
  fallbackText: {
    marginVertical: 40,
		fontSize: 16,
		color: COLORS.mainText,
	},
});
