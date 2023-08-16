import { ref, push, child, update, runTransaction } from "firebase/database";

import { db } from "../firebase/config";
import Comment from "../models/Comment";

export default async function saveComment(authorId, text, postId) {
  const comment = new Comment(authorId, text);
  console.debug("saveComment>>comment", comment);

    try {
			// Get a key for a new comment
      const commentRef = child(ref(db), "posts/" + postId + "/comments");
      const commentsCountRef = child(ref(db), "posts/" + postId + "/commentsCount");
			const newCommentKey = push(commentRef).key;

			// Write the new comment's data to the post's comments list
			const updates = {};
      updates["posts/" + postId + "/comments/" + newCommentKey] = comment;

      await update(ref(db), updates);
      console.log("saveComment>>id", newCommentKey);
     // await runTransaction()
		} catch (e) {
			console.error("Error @saveComment>>", e);
		}
}

export  async function saveCommentTrans(authorId, text, postId) {
  const comment = new Comment(authorId, text);
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
