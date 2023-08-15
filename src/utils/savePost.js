import { ref,  push, child, update } from "firebase/database";

import { db } from "../firebase/config";
import Post from "../models/Post";

export default async function savePost(authorId, title, place, location, url) {
	const post = new Post(authorId, title, place, location, url);
  console.debug("savePost>>", post);

  //const stripRef = ref(db, "strip");

  try {
		// Get a key for a new Post.
		const newPostKey = push(child(ref(db), "posts")).key;

		// Write the new post's data simultaneously to the posts collection,
    // the user's post list and strip (ala all/recent posts)
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
	} catch (e) {
		console.error("Error @savePost>>", e);
	}
}
