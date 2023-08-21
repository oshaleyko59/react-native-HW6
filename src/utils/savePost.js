import { ref,  push, child, update } from "firebase/database";

import { db } from "../firebase/config";
import Post from "../models/Post";

export default async function savePost(authorId, title, place, location, url) {
	const post = new Post(authorId, title, place, location, url);

  try {
		// Get a key for a new Post.
		const newPostKey = push(child(ref(db), "posts")).key;

		// Write the new post's data simultaneously to the posts collection,
    // the user's post list and strip (can be recent or followed posts)
		const updates = {};
		updates["/posts/" + newPostKey] = post;
    updates["/users/" + authorId + "/posts/" + newPostKey] = true;
    updates["/strip/" + newPostKey] = true;


		await update(ref(db), updates);
		//TODO: return Promise and move error handling to outer function

	} catch (err) {
		console.log("Error @savePost>>", err); //FIXME: handle in component
	}
}
