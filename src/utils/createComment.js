import { ref, push, child, update, increment } from "firebase/database";

import { db } from "../firebase/config";
import Comment from "../models/Comment";

/**
 * new commmment with update and server-side increment
 * @param {*} authorId
 * @param {*} text
 * @param {*} postId
 */
export async function createComment(text, postId, authorId, avatar) {
	const comment = new Comment(text, authorId, avatar);
	//commentsCountRef
	const commentRef = child(ref(db), "comments/" + postId);
	const newCommentKey = push(commentRef).key;
	const updates = {};
	updates[`comments/${postId}/${newCommentKey}`] = comment;
	updates[`posts/${postId}/commentsCount`] = increment(1);
	return update(ref(db), updates);
}

/* *
 * new commmment as atomic transaction
 * @param {*} authorId
 * @param {*} text
 * @param {*} postId

export async function saveCommentTrans(text, postId) {
	const { user } = useAuth();
	const comment = new Comment(text.user.uid, user.photoURL);
	console.debug("saveComment>>comment", comment);

	const postRef = ref(db, "/posts/" + postId);
	const commentRef = child(ref(db), "posts/" + postId + "/comments");
	const newCommentKey = push(commentRef).key;

	runTransaction(postRef, (post) => {
		if (post) {
			if (!post.comments) {
				post.comments = {};
			}
			post.comments[newCommentKey] = comment;
			post.commentsCount++;
		}
		return post;
	});
}
*/
