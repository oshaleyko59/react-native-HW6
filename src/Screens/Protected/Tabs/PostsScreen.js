import { View, StyleSheet } from "react-native";

import UserCard from "../../../components/UserCard";
import PostsList from "../../../components/Posts/PostsList";
import { COLORS } from "../../../common/constants";

import dummyPosts from "../../../models/dummyPosts";

export default function PostsScreen() {

	return (
		<View style={styles.container}>
			<View>
				<UserCard />
			</View>
			<PostsList posts={dummyPosts} />
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

