import {
	ref,
	runTransaction,
} from "firebase/database";

import { db } from "../firebase/config";

export default function toggleLike(uid, postId) {
	const postRef = ref(db, "/posts/" + postId);
  console.debug("toggleLike>>ids", uid, postId);
	runTransaction(postRef, (post) => {
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
}
