import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { onChildAdded } from "firebase/database";

import PostCard from "./postcard/PostCard";
import { COLORS } from "../../common/constants";

/**
 * displays posts as FlatList
 * @param  listRef - list of post ids(object) //TODO: object with posts (need unigue keys under any circumstances)
 * @returns
 */
function PostsList({ listRef }) {
	const [postIdArr, setPostIdArray] = useState([]);

	useEffect(() => {
		const unsubscribe = onChildAdded(listRef, (data, prevChildName) => {
			const key = data.key;
			console.debug("PostsList>>onChildAdded", key);
			const postId = {};
			postId[key] = true;
			setPostIdArray((postIdArr) => [postId, ...postIdArr]);
		});
		return unsubscribe; //returns Unsubcribe func
	}, []);

	if (!postIdArr) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No posts yet - start creating some!
				</Text>
			</View>
		);
  }

	//console.debug("PostsList>>postIdArr", postIdArr.length);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.mainBkg,
			}}
		>
			<FlatList
				data={postIdArr}
				renderItem={(item) => <PostCard postId={Object.keys(item.item)[0]} />}
			/>
		</View>
	);
}

export default PostsList;

const styles = StyleSheet.create({
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

//keyExtractor={(item) => item.id} keyExtractor={(item) => item.id}
//renderItem={(itemData) => <PostCard {...itemData.item}
