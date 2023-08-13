import { ref, set, push, child, update } from "firebase/database";

import { db } from "../firebase/config";
import Post from "../models/Post";

export default async function savePost(authorId, title, place, location, url) {
	//id = uuid.v4(); //postId
	const post = new Post(authorId, title, place, location, url);
	console.debug("savePost>>", post);
  try {
		// Get a key for a new Post.
		const newPostKey = push(child(ref(db), "posts")).key;

		// Write the new post's data simultaneously in the posts list and the user's post list.
		const updates = {};
		updates["/posts/" + newPostKey] = post;
		updates["/users/" + authorId + "/posts/" + newPostKey] = true;
		console.log("savePost>>id", newPostKey);
		//return
		await update(ref(db), updates);

		//await set(ref(db, "posts/" + id), post);
		//
		//TODO: add to user's posts array
	} catch (e) {
		console.error("Error @savePost>>", e);
	}
}
