import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import UserCard from "../../../components/UserCard";
import PostsList from "../../../components/Posts/PostsList";
import { COLORS } from "../../../common/constants";
import useAuth from "../../../hooks/useAuthentication";
import getPosts from "../../../utils/getPosts";
//import dummyPosts from "../../../models/dummyPosts";
const dummyPosts = [];
export default function PostsScreen() {
/*   const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
		setPosts(getPosts(user.uid));
	}, []);
 */
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

