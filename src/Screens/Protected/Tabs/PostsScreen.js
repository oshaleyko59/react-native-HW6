import { View, StyleSheet } from "react-native";
import { useAuthContext } from "../../../store/auth-context";

import UserCard from "../../../components/UserCard";
import PostsList from "../../../components/Posts/PostsList";
import { COLORS } from "../../../common/constants";

import dummyPosts from "../../../models/dummyPosts";

export default function PostsScreen() {
	const { getUser } = useAuthContext();
	const user = getUser();

	return (
		<View
      style={styles.container}
		>
			<View>
				<UserCard user={user} />
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

