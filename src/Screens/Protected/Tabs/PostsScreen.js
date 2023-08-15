import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { ref, onValue, onChildAdded } from "firebase/database";

import { db } from "../../../firebase/config";
import UserCard from "../../../components/UserCard";
import PostsList from "../../../components/Posts/PostsList";
import { COLORS } from "../../../common/constants";

export default function PostsScreen() {
	const [posts, setPosts] = useState([]);

	const stripRef = ref(db, "strip");

	const loadPosts = () =>
		onValue(
			stripRef,
			(snapshot) => {
				const posts = [];
				console.info("PostsScreen>>onvalue ", snapshot);
				snapshot.forEach((childSnapshot) => {
					const childKey = childSnapshot.key;
					const postId = {};
					postId[childKey] = true;
					console.info(">>childSnapshot", childSnapshot);
					posts.push(postId);
				});
				console.debug("Once onvalue>>posts", posts);
				setPosts(posts);
			},
			{
				onlyOnce: true,
			}
		);
	/*
  useEffect(() => { //FIXME:
    onChildAdded(stripRef, (data) => {
      //  const post = data.val();
      const key = data.key;
      console.debug("PostsScreen>>onChildAdded", key);
      setPosts((posts) => [{id:key}, ...posts]);
    });
  }, []);*/

	useLayoutEffect(() => {
		try {
			loadPosts();
			console.log("useLayoutEffect>>posts ", posts.length);
		} catch (err) {
			console.error(err);
		}
	}, []);
	console.log("PostsScreen>>#posts ", posts.length);

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
