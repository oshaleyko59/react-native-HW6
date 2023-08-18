import {
	ref,
	runTransaction,
} from "firebase/database";

import { db } from "../firebase/config";

export default async function toggleLike(uid, postId) {
  try {
	const postRef = ref(db, "/posts/" + postId);
 // console.debug("toggleLike>>ids", uid, postId);
	await runTransaction(postRef, (post) => {
		if (post) {
			if (post.likes && post.likes[uid]) {
				post.likesCount--;
				post.likes[uid] = null;
			} else {
				post.likesCount++;
				if (!post.likes) {
					post.likes = {};
				}
				post.likes[uid] = true;
			}
		}
		return post;
  });
  } catch (err) {
		console.error("Error @toggleLike>>", err);
	}
}

//TODO: save likes to a separate collection
//with postID as key not to download with the post every time
//TODO: handleError
