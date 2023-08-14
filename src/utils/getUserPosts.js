import { ref,  onValue } from "firebase/database";

import { db } from "../firebase/config";
import getPost from "./getPost";


export default async function getUserPosts(userId, setPosts) {
	const postsRef = ref(db, `users/${userId}/posts`);
	const posts = [];
	//console.debug("getUserPosts>>", userId);
	onValue(
		postsRef,
    (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
			 // console.debug("getUserPosts>>childKey", childKey);
			const post = getPost(childKey, posts); //await
				//console.debug("getUserPosts>>post", post);
				/* 				const childData = childSnapshot.val();*/
      });
     // console.info("getUserPosts>>posts", posts);
			setPosts(posts);
		},
		{
			onlyOnce: true,
		}
	);
}
