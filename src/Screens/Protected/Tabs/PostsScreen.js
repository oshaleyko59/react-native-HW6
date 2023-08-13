import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useState } from "react";

import UserCard from "../../../components/UserCard";
import PostsList from "../../../components/Posts/PostsList";
import { COLORS } from "../../../common/constants";
import getAllPosts from "../../../utils/getAllPosts";

const dummyPosts = [];
export default function PostsScreen() {
	const [posts, setPosts] = useState([]);

	useLayoutEffect(() => {
		(async () => {
			try {
				await getAllPosts(setPosts);
				console.log("useLayoutEffect>>posts ", posts.length);
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			<View>
				<UserCard />
			</View>
			<PostsList posts={posts} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		flex: 1,
		backgroundColor: COLORS.mainBkg,
	},
});
