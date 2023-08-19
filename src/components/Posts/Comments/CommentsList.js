import { useEffect, useState} from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ref, child, onChildAdded } from "firebase/database";

import { db } from "../../../firebase/config";
import CommentCard from "./CommentCard";
import { COLORS } from "../../../common/constants";

export default function CommentsList({ postId }) {
	const [comments, setComments] = useState([]);
	const commentsRef = child(ref(db), "comments/" + postId);

	useEffect(() => {
		const unsubscribe = onChildAdded(commentsRef, (data) => {
			const key = data.key;
			const item = { ...data.val() };
			item.id = key;
			setComments((state) => [...state, item]);
    });

		return unsubscribe; //returns Unsubcribe func
	}, []);

	if (!comments || comments.length === 0) {
    return <></>
	}

	return (
		<View	style={{flex: 1,}} >
			<FlatList
				ref={(ref) => (this.flatList = ref)}
				onContentSizeChange={() =>
					this.flatList.scrollToEnd({ animated: true })
				}
				onLayout={() => this.flatList.scrollToEnd({ animated: true })}
				data={comments}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <CommentCard {...item} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.mainBkg,
		paddingVertical: 16,
	},
});

/* (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No comments yet - start commenting!
				</Text>
			</View>
		); */
/* 	fallbackContainer: {
		flex: 1,
		alignItems: "center",
	},
	fallbackText: {
		marginVertical: 40,
		fontSize: 20,
		color: COLORS.mainText,
	}, */
