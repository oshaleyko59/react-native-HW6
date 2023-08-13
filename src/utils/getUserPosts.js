import { ref, set, push, child, onValue } from "firebase/database";

import { db } from "../firebase/config";
import getPost from "./getPost";


export default async function getUserPosts(userId, setPosts) {
	const postsRef = ref(db, `users/${userId}/posts`);
	const posts = [];
	console.debug("getUserPosts>>", userId);
	onValue(
		postsRef,
    (snapshot) => {
      console.debug("getUserPosts>>snapshot", snapshot.val());
			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
				console.debug("getUserPosts>>", getPost());
				/* 				const childData = childSnapshot.val();
				posts.push({ id: childKey, ...childData }); */
			});
			//	setPosts(posts);
		},
		{
			onlyOnce: true,
		}
	);
	return posts;
}
