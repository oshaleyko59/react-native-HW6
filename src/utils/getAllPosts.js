import { ref, set, push, child, onValue } from "firebase/database";

import { db } from "../firebase/config";

const postsRef = ref(db, 'posts');

export default async function getAllPosts(setPosts) {
  const posts = [];

  onValue(
		postsRef,
    (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
				const childData = childSnapshot.val();
				posts.push({ id: childKey, ...childData });
			});
			setPosts(posts);
		},
		{
			onlyOnce: true,
		}
	);
	return posts;
}
