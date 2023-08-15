import { FlatList, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../common/constants";
import PostCard from "./PostCard";

/**
 * displays posts as FlatList
 * @param  posts - list of post ids
 * @returns
 */
function PostsList({ posts }) {
  console.info("PostsList>>posts ", posts);

	if (!posts || posts.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No posts yet - start creating some!
				</Text>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.mainBkg,
			}}
		>
			<FlatList
				data={posts}
				renderItem={(item) => {
					//console.log("FlatList>>item", Object.keys(item.item)[0]);
					return <PostCard postId={Object.keys(item.item)[0]} />;
				}}
			/>
		</View>
	);
}

export default PostsList;

	//keyExtractor={(item) => item.id} keyExtractor={(item) => item.id}
	//renderItem={(itemData) => <PostCard {...itemData.item}

  
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
