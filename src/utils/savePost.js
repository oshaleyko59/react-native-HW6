import { ref,  push, child, update } from "firebase/database";

import { db } from "../firebase/config";
import Post from "../models/Post";

export default async function savePost(authorId, title, place, location, url) {
	const post = new Post(authorId, title, place, location, url);

  try {
		// Get a key for a new Post.
		const newPostKey = push(child(ref(db), "posts")).key;

		// Write the new post's data simultaneously to the posts collection,
    // the user's post list and strip (ala all/TODO recent or followed posts)
		const updates = {};
		updates["/posts/" + newPostKey] = post;
    updates["/users/" + authorId + "/posts/" + newPostKey] = true;
    updates["/strip/" + newPostKey] = true;

		console.log("savePost>>id", newPostKey);
		//return
		await update(ref(db), updates);

		//await set(ref(db, "posts/" + id), post);
		//
		//TODO: add to user's posts array
	} catch (err) {
		console.error("Error @savePost>>", err);
	}
}
